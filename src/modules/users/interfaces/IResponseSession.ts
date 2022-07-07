import User from '@modules/users/infra/typeorm/entities/User';

export default interface IResponseSession {
  user: User;
  token: string;
}
