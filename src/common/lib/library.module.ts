import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DotenvAdaptModule } from "./env/dotenv-adopt.module";
import { TypeormAdaptModule } from "./database/typeorm-adapt.module";
import { TransactionHandler } from "./handler/transaction.handler";
import { TimeLoggerLibrary } from "./logger/time-logger.library";
import { ResponseHandler } from "./handler/response.handler";
import { ValidateLibrary } from "./util/validate.library";

@Module({
  imports: [DotenvAdaptModule, TypeormAdaptModule],
  providers: [ConfigService, TransactionHandler, TimeLoggerLibrary, ResponseHandler, ValidateLibrary],
  exports: [TransactionHandler, TimeLoggerLibrary, ResponseHandler, ValidateLibrary],
})
export class LibraryModule {}
