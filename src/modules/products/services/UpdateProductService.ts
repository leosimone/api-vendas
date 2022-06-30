import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequestUpdate from '../interfaces/IRequestUpdate';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequestUpdate): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product nodt found');
    }

    const productExists = await productsRepository.findByName(name);
    if (productExists && name != product.name) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
