import { getCustomRepository } from 'typeorm';
import IPaginateCustomer from '../domain/interfaces/IPaginateCustomer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customers = await customerRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
