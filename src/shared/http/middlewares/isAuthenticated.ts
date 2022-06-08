import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  //vrf se o cabeçalho está vazio, middleware de autorizacao

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  // header é formado pelo bearer e pelo token
  //array em que a posição 0 tá vazio e a posição 1 é o token
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    //override de tipos no request, pra aceitar o user

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid Token');
  }
}
