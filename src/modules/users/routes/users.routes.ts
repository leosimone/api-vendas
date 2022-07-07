import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import upload from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/infra/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();
//abaixo refatorado na aula 119
const uploadConfig = multer(upload.multer);

//token validação = aula 48
usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated, //middleware que verifica autenticação
  uploadConfig.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
