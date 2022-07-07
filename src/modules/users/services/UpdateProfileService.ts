import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import IRequestUpdateProfile from '../interfaces/IRequestUpdateProfile';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UserRepository';
import { compare, hash } from 'bcryptjs';

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequestUpdateProfile): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }
    const userUpdateEmail = await usersRepository.findByEmail(email);
    //abaixo pessoa tentando atualizar com email de outra pessoa

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }

    //abaixo se tenta atualizar sem senha antiga, não deixa
    if (password && !old_password) {
      throw new AppError('old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
      user.password = await hash(password, 8);
    }
    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
