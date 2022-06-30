/* eslint-disable prettier/prettier */
import fs from 'fs';
import handlebars from 'handlebars';
import IparseMailTemplate from './interfaces/IParseMail';

export default class handlebarsMailTemplate {
  public async parse({ file, variables }: IparseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
