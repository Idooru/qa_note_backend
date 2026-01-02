import { Module } from '@nestjs/common';
import { LibraryModule } from './common/lib/library.module';

@Module({
  imports: [LibraryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
