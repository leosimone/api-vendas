/* eslint-disable prettier/prettier */
import { ICreateCustomer } from '@modules/customers/domain/interfaces/ICreateCustomer';
import { ICustomerRepository } from '@modules/customers/domain/interfaces/repositories/ICustomersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { v4 as uuidv4 } from 'uuid';

// refatorado na aula 136, onde foi alterado o repositorio
class FakeCustomersRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }


  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    )
    this.customers[findIndex] = customer;
    return customer;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }


  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}


export default FakeCustomersRepository;
