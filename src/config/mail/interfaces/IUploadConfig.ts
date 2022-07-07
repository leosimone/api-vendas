import { StorageEngine } from 'multer';

export default interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    // disk: {};
    aws: {
      bucket: string;
    };
  };
}
