import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { LibraryModule } from "./common/lib/library.module";
import { TaskModule } from "./model/task/task.module";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { LibraryExceptionFilter } from "./common/filters/library-exception.filter";
import { TypeormErrorFilter } from "./common/filters/typeorm-error.filter";
import { ValidationExceptionFilter } from "./common/filters/validation-exception.filter";
import { ValidateLoggerInterceptor } from "./common/interceptors/validations/validate-logger.interceptor";
import { ResponseLoggerMiddleware } from "./common/middlewares/response-logger.middleware";

@Module({
  imports: [
    // library
    ...[LibraryModule],
    // model
    ...[TaskModule],
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: LibraryExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: TypeormErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidateLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseLoggerMiddleware)
      .exclude({ path: "validate", method: RequestMethod.ALL })
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
