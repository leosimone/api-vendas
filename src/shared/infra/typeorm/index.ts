// import { DataSource } from 'typeorm';

// import User from '@modules/users/infra/typeorm/entities/User';
// import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
// import Customer from '@modules/customers/infra/typeorm/entities/Customer';
// import Order from '@modules/orders/infra/typeorm/entities/Order';
// import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProdutcs';
// import Product from '@modules/products/infra/typeorm/entities/product';

// import { CreateProducts1654259007225 } from './migrations/1654259007225-CreateProducts';
// import { CreateUsers1607534203338 } from './migrations/1656072600705-CreateUsersTokens';
// import { CreateUsers1607534203339 } from './migrations/1654534417574-CreateUsers';
// import { CreateCustomers1656682951610 } from './migrations/1656682951610-CreateCustomers';
// import { CreateOrders1656935669703 } from './migrations/1656935669703-CreateOrders';
// import { AddCustomerIdToOrders1656936338027 } from './migrations/1656936338027-AddCustomerIdToOrders';
// import { CreateOrdersProducts1656937462248 } from './migrations/1656937462248-CreateOrdersProducts';
// import { AddOrderIdToOrdersProducts1656938494600 } from './migrations/1656938494600-AddOrderIdToOrdersProducts';
// import { AddProductIdToOrdersProducts1656940468956 } from './migrations/1656940468956-AddProductIdToOrdersProducts';
// import { options } from 'joi';

// export const dataSource = new DataSource(options: {

// })

import { createConnection } from 'typeorm';

createConnection();
