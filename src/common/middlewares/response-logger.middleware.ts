import { NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Implemented } from '../decorators/implemented.decoration';
import { loggerFactory } from '../function/logger.factory';

export class ResponseLoggerMiddleware implements NestMiddleware {
  @Implemented()
  public use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      const { ip, originalUrl, method } = req;
      const { statusCode, statusMessage } = res;
      let logger: Logger;

      if (400 <= statusCode || statusCode >= 599) {
        logger = loggerFactory('Fail');
        logger.error(
          `${method} ${originalUrl} ${ip} - ${statusCode} ${statusMessage}`,
        );
      } else {
        logger = loggerFactory('Success');
        logger.log(
          `${method} ${originalUrl} ${ip} - ${statusCode} ${statusMessage}`,
        );
      }
    });

    next();
  }
}
