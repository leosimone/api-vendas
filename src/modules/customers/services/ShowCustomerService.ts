import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequestShowCustomer from '../interfaces/IRequestShowCustomer';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ShowCustomerService {
  public async execute({ id }: IRequestShowCustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
