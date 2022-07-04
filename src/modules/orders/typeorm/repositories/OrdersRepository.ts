import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import IRequestOrder from '../interface/IRequestOrder';

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  //aula 88, sobre relacionamentos
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({
    customer,
    products,
  }: IRequestOrder): Promise<Order | undefined> {
    const order = this.create({
      customer,
      order_products: products,
    });
    await this.save(order);

    return order;
  }
}
