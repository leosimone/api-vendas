import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// os ".." estão voltando níveis para encontrar a pasta
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  directory: uploadFolder,
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    //abaixo renomeia arquivo - Multer é para armazenar arquivos, os avatares no caso.
    filename(request, file, callback) {
      //usando crypto para criar hash, arquivos nunca terão mesmo nome
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;
      //abaixo salvando arquivo
      callback(null, filename);
    },
  }),
};
