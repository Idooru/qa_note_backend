import { Module } from '@nestjs/common';
import { DotenvAdaptModule } from './common/lib/env/dotenv-adopt.module';

@Module({
  imports: [DotenvAdaptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
