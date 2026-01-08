import { Module } from "@nestjs/common";
import { TaskEntity } from "./entities/task.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskV1Controller } from "./api/v1/controllers/task-v1.controller";
import { LibraryModule } from "../../common/lib/library.module";
import { CqrsModule } from "@nestjs/cqrs";
import { Transactional } from "../../common/interfaces/initializer/transactional";
import { TaskTransactionInitializer } from "./api/common/task-transaction.initializer";
import { CreateTaskHandler } from "./api/v1/cqrs/commands/handlers/create-task.handler";
import { FetchTasksWithStartDateHandler } from "./api/v1/cqrs/queries/handlers/fetch-tasks-with-start-date.handler";
import { ChangeTaskSeqHandler } from "./api/v1/cqrs/commands/handlers/change-task-seq.handler";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), LibraryModule, CqrsModule],
  controllers: [TaskV1Controller],
  providers: [
    // { provide: 'cart-select', useValue: cartSelect },
    { provide: Transactional, useClass: TaskTransactionInitializer },
    // common
    ...[TaskTransactionInitializer],
    // v1 logic
    // ...[
    //   CartService,
    //   CartSearchRepository,
    //   CartUpdateRepository,
    //   CartValidateRepository,
    //   CartSearcher,
    //   CartValidator,
    // ],
    // v2 logic
    ...[
      // cqrs handlers
      ...[
        // commands
        ...[CreateTaskHandler, ChangeTaskSeqHandler],
        // queries
        ...[FetchTasksWithStartDateHandler],
        // validations
        // ...[IsExistCartIdHandler],
      ],
    ],
    // helpers
    // ...[CommonCartCommandHelper],
  ],
  exports: [],
})
export class TaskModule {}
