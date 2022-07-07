import IRequestDelete from '../interfaces/IRequestDelete';
import AppError from '@shared/errors/AppError';
import { Interface } from 'readline';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

class DeleteProductService {
  public async execute({ id }: IRequestDelete): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    // const redisCache = new RedisCache();

    if (!product) {
      throw new AppError('Product nodt found');
    }

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
