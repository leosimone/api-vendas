import { container } from 'tsyringe';
import { ICustomerRepository } from '@modules/customers/domain/interfaces/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

//aula sobre injections 138 com refatoração

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);
