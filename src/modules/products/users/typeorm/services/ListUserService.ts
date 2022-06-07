import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UserRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);

    const users = userRepository.find();

    return users;
  }
}

export default ListUserService;
