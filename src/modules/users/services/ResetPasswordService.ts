import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import AppError from '@shared/errors/AppError';
// eslint-disable-next-line prettier/prettier
import { isAfter, addHours } from 'date-fns';
// eslint-disable-next-line prettier/prettier
import { hash } from 'bcryptjs';
import IRequestPassword from '../interfaces/IRequestPassword';

class ResetPasswordService {
  public async execute({ token, password }: IRequestPassword): Promise<void> {
    //void, não vai precisar retornar nada, só enviar o email
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    // eslint-disable-next-line prettier/prettier
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired');
    }

    user.password = await hash(password, 8);
    await usersRepository.save(user);
  }
}
export default ResetPasswordService;
