import IRequestCreateProduct from '../interfaces/IRequestCreateProduct';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequestCreateProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with this name');
    }
    //abaixo refatorado na aula 120
    // const redisCache = new RedisCache();

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    //abaixo zera o cache quando cria um produto novo, aula 105

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
