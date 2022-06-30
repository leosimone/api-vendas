import IRequestDelete from '../interfaces/IRequestDelete';
import AppError from '@shared/errors/AppError';
import { Interface } from 'readline';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

class DeleteProductService {
  public async execute({ id }: IRequestDelete): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product nodt found');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
