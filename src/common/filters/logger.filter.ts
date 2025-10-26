import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = randomUUID();
    req.headers['x-request-id'] = requestId;
    console.log(
      `[${req.method}] ${req.originalUrl} | Request-ID: ${requestId}`,
    );
    req['metadata'] = { requestId, timestamp: new Date() };
    console.log('first layer middleware');
    next();
  }
}
