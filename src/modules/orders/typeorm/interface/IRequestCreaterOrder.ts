import IProductOrder from './IProductOrder';

export default interface IRequestCreateOrder {
  customer_id: string;
  products: IProductOrder[];
}
