/* eslint-disable prettier/prettier */
import handlebars from 'handlebars';
import IparseMailTemplate from './interfaces/IParseMail';

export default class handlebarsMailTemplate {
  public async parse({ template, variables }: IparseMailTemplate): Promise<string> {

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
