import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import IRequestCreateOrder from '../typeorm/interface/IRequestCreaterOrder';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

class CreateOrderService {
  public async execute({
    customer_id,
    products,
  }: IRequestCreateOrder): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customersExists = await customerRepository.findById(customer_id);

    if (!customersExists) {
      throw new AppError('Customer does not exists with this id');
    }

    //aula 90, sobre novas funções

    const existsProduct = await productsRepository.findAllByIds(products);

    await productsRepository.save(product);

    return product;
  }
}

export default CreateOrderService;
