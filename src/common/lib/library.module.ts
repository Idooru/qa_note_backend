import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DotenvAdaptModule } from './env/dotenv-adopt.module';

@Module({
  imports: [DotenvAdaptModule],
  providers: [ConfigService],
  exports: [],
})
export class LibraryModule {}
