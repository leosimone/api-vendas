import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';
import upload from '@config/upload';
import path from 'path';
import fs from 'fs';
import IRequestUpdateAvatar from '../interfaces/IRequestUpdateAvatar';
import DiskStorageProvider from '@shared/providers/storageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storageProvider/S3StorageProvider';

class UpdateUserAvatarService {
  public async execute({
    user_id,
    avatarFilename,
  }: IRequestUpdateAvatar): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    if (upload.driver === 's3') {
      const s3Provider = new S3StorageProvider();
      //refatorado abaixo na aula 119
      if (user.avatar) {
        await s3Provider.deleteFile(user.avatar);
      }
    } else {
      const diskProvider = new DiskStorageProvider();
      //refatorado abaixo na aula 119
      if (user.avatar) {
        await diskProvider.deleteFile(user.avatar);
      }

      const fileName = await diskProvider.saveFile(avatarFilename);
      user.avatar = fileName;
    }

    //abaixo tudo foi comentado pois foi refatorado na aula 116
    // //abaixo pega o caminho do arquivo e junta com o nome do avatar, pelo join
    // const userAvatarFilePath = path.join(upload.directory, user.avatar);
    // //abaixo vai verificar se o avatar existe
    // const userAvatarfileExists = await fs.promises.stat(userAvatarFilePath);
    // // se o avatar existir, vai deletar antes de colocar o novo
    // if (userAvatarfileExists) {
    //   await fs.promises.unlink(userAvatarFilePath); //unlink já deleta
    // }

    await usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
