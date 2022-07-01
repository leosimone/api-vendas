import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import upload from '@config/upload';

import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);
//token validação = aula 48
profileRouter.get('/', isAuthenticated, profileController.show);

//abaixo aula 75 sobre a o update de perfil e as questões do password(quando necessário)
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_passowrd: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
