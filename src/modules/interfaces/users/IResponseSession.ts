import User from '@modules/users/typeorm/entities/User';

export default interface IResponseSession {
  user: User;
  token: string;
}
