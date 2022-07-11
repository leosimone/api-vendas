// aula 149, refatorando o hash.
//tirando o método dos services
export interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
