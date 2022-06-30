import IMailContact from './IMailContact';
import IparseMailTemplate from './IParseMail';

export default interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IparseMailTemplate;
}
