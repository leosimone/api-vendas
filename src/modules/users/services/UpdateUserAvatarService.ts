import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';
import upload from '@config/upload';
import path from 'path';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      //abaixo pega o caminho do arquivo e junta com o nome do avatar, pelo join
      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      //abaixo vai verificar se o avatar existe
      const userAvatarfileExists = await fs.promises.stat(userAvatarFilePath);

      // se o avatar existir, vai deletar antes de colocar o novo
      if (userAvatarfileExists) {
        await fs.promises.unlink(userAvatarFilePath); //unlink já deleta
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
