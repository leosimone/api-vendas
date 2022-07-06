import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';
import IRequestMailForgot from '../interfaces/IRequestMailForgot';
import path from 'path';
import SESMail from '@config/mail/SESMail';
import IMailConfig from '@config/mail/interfaces/IMailConfig';
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

    if (IMailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: 'API Vendas - recuperação senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
          },
        },
      });
      return;
    }
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
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token.token}`,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;
