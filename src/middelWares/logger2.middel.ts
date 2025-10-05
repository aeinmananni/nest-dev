/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';

export const LoggerMiddelWare2 = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('MiddelWare 2');

  next();
};
