import AppError from '@shared/errors/AppError';
import { Interface } from 'readline';
import { getCustomRepository } from 'typeorm';
import Product from '../Product';
import { ProductRepository } from '../repositories/ProductsRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product nodt found');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
