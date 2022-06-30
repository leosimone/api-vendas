import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import UsersRepository from '../typeorm/repositories/UserRepository';
import IRequestSession from '../interfaces/IRequestSession';
import IResponseSession from '../interfaces/IResponseSession';
import { getCustomRepository } from 'typeorm';

class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IRequestSession): Promise<IResponseSession> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);
    //utiliza método do bcrypt para comparar o que veio com o password do banco

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    //autenticação com JWT, aula 47

    return { user, token };
  }
}
export default CreateSessionsService;
