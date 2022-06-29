import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    //void, não vai precisar retornar nada, só enviar o email
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }
    const token = await userTokenRepository.generate(user.id);
    //console.log(token, 'token');
    //abaixo serviço de recuperação de email, aula 65, usando Ethereal fake email
    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha: ${token?.token}`,
    });
  }
}
export default SendForgotPasswordEmailService;
