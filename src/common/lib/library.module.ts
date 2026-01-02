import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DotenvAdaptModule } from './env/dotenv-adopt.module';
import { TypeormAdaptModule } from './database/typeorm-adapt.module';

@Module({
  imports: [DotenvAdaptModule, TypeormAdaptModule],
  providers: [ConfigService],
  exports: [],
})
export class LibraryModule {}
