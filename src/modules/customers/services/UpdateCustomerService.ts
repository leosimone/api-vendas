import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequestUpdateCustomer from '../interfaces/IRequestUpdateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IRequestUpdateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }
    const customerExists = await customersRepository.findByEmail(email);
    //abaixo pessoa tentando atualizar com email de outra pessoa

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
