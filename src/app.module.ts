import { Module } from '@nestjs/common';
import { LibraryModule } from './common/lib/library.module';
import { TaskModule } from './model/task/task.module';

@Module({
  imports: [
    // library
    ...[LibraryModule],
    // model
    ...[TaskModule],
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
