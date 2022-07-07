import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequestShowCustomer from '../domain/interfaces/IRequestShowCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

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
