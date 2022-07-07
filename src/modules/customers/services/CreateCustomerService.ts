import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';
import IRequestCreateCustomer from '../interfaces/IRequestCreateCustomer';
import AppError from '@shared/errors/AppError';

class CreateCustomerService {
  public async execute({
    name,
    email,
  }: IRequestCreateCustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const emailExists = await customerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already used.');
    }
    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}
export default CreateCustomerService;
