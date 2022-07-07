import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequestUpdate from '../interfaces/IRequestUpdate';
import Product from '../infra/typeorm/entities/product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequestUpdate): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    // const redisCache = new RedisCache();
    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);
    if (productExists && name != product.name) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
