import productsRouter from '@modules/products/routes/products.routes';
import sessionsRouter from '@modules/products/users/routes/sessions.routes';
import usersRouter from '@modules/products/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
