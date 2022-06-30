/* eslint-disable prettier/prettier */
import handlebars from 'handlebars';

interface ItemplateVariable {
    // eslint-disable-next-line prettier/prettier
    [key: string]: string | number;
}

interface IparseMailTemplate {
    template: string;
    variables: ItemplateVariable;
}
export default class handlebarsMailTemplate {
    public async parse({ template, variables }: IparseMailTemplate): Promise<string> {

        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}
