import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';
import upload from '@config/upload';
import path from 'path';
import fs from 'fs';
import IRequestUpdateAvatar from '../interfaces/IRequestUpdateAvatar';
import DiskStorageProvider from '@shared/providers/storageProvider/DiskStorageProvider';

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: IRequestUpdateAvatar): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const storageProvider = new DiskStorageProvider();

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);

      //abaixo tudo foi comentado pois foi refatorado na aula 116
      // //abaixo pega o caminho do arquivo e junta com o nome do avatar, pelo join
      // const userAvatarFilePath = path.join(upload.directory, user.avatar);
      // //abaixo vai verificar se o avatar existe
      // const userAvatarfileExists = await fs.promises.stat(userAvatarFilePath);
      // // se o avatar existir, vai deletar antes de colocar o novo
      // if (userAvatarfileExists) {
      //   await fs.promises.unlink(userAvatarFilePath); //unlink já deleta
      // }
    }

    const fileName = await storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
