import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
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

    const token = sign({}, '68c10a9fa75788f5868426f65a429b08', {
      subject: user.id,
      expiresIn: '1d',
    });

    //autenticação com JWT, aula 47

    return { user, token };
  }
}
export default CreateSessionsService;
