import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RespMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    try {
      const resp = await next();
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  }
}
