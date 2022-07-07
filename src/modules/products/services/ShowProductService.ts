import AppError from '@shared/errors/AppError';
import { Interface } from 'readline';
import { getCustomRepository } from 'typeorm';
import IRequestShow from '../interfaces/IRequestShow';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class ShowProductService {
  public async execute({ id }: IRequestShow): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product nodt found');
    }

    return product;
  }
}

export default ShowProductService;
