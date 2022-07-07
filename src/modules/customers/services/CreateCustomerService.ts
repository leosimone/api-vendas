/* eslint-disable prettier/prettier */
import IRequestCreateCustomer from '../domain/interfaces/IRequestCreateCustomer';
import AppError from '@shared/errors/AppError';
import { ICustomerRepository } from '../domain/interfaces/repositories/ICustomersRepository';
import { ICustomer } from '../domain/interfaces/ICustomer';
import { inject, injectable } from 'tsyringe';

//refatorado na aula 137 e 138 sobre dependencies
@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) { }
  public async execute({
    name,
    email,
  }: IRequestCreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already used.');
    }
    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}
export default CreateCustomerService;
