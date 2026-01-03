import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Implemented } from "../../decorators/implemented.decoration";
import { Request, Response } from "express";
import { loggerFactory } from "../../function/logger.factory";
import { ResponseValidateDto } from "../../classes/response-validate.dto";

@Injectable()
export class ValidateLoggerInterceptor implements NestInterceptor {
  private log(req: Request, res: Response, payload: ResponseValidateDto): void {
    const { ip, method, originalUrl } = req;
    const { statusCode } = res;
    const { isValidate, errors } = payload;

    let logger: Logger;
    if (isValidate) {
      logger = loggerFactory("ValidateSuccess");
      logger.log(`${method} ${originalUrl} ${ip} - ${statusCode}`);
    } else {
      logger = loggerFactory("ValidateFail");
      logger.error(`${method} ${originalUrl} ${ip} - ${statusCode} ${JSON.stringify(errors)}`);
    }
  }

  @Implemented()
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    // validate 경로가 아니면 로깅 스킵
    if (!req.originalUrl.includes("validate")) {
      return next.handle();
    }

    return next.handle().pipe(tap((payload: ResponseValidateDto) => this.log(req, res, payload)));
  }
}
