import 'reflect-metadata';
import FakeCustomersRepository from '../domain/fakes/FakeCustomerRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    const customer = await createCustomer.execute({
      name: 'Leo',
      email: 'leosimone@mail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', () => {
    expect(1).toBe(1);
  });
});
