import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtKey } from '../util/generate-jwt-key';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.token) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.token, getJwtKey()) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
