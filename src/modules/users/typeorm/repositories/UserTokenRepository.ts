import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });
    console.log(userToken);
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = await this.create({
      user_id,
    });
    await this.save(userToken);
    console.log(userToken);
    return userToken;
  }
}

export default UserTokenRepository;