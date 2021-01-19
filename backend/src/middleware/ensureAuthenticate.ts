import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../config/auth';
import AppError from '../error/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('JTW token is missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

  const { sub } = decoded as TokenPayload;

  req.user = {
    id: sub,
  };

  next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401)
  }

}
