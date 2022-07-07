import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequestDeleteCustomer from '../domain/interfaces/IRequestDeleteCustomer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class DeleteCustomerService {
  public async execute({ id }: IRequestDeleteCustomer): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
