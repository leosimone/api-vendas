import upload from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';
import AppError from '@shared/errors/AppError';

//aula 115 sobre storage
export default class S3StorageProvider {
  private client: S3;
  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  //abaixo aula 118 onde passa os parametros da AWS

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);
    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new AppError('file not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: upload.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();
    //abaixo apaga o arquivo depois que foi pra S3
    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: upload.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
