import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';
import IRequestMailForgot from '../interfaces/IRequestMailForgot';
import path from 'path';

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequestMailForgot): Promise<void> {
    //void, não vai precisar retornar nada, só enviar o email
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists');
    }
    const token = await userTokenRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs',
    );
    //abaixo serviço de recuperação de email, aula 65, usando Ethereal fake email
    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'API Vendas - recuperação senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3333/reset_password?token=${token.token}`,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;
