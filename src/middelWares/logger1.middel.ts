/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddelWare1 implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('MiddelWare 1');

    next();
  }
}
