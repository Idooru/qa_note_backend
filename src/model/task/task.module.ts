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
import { ModifyTaskTitleHandler } from "./api/v1/cqrs/commands/handlers/modify-task-title.handler";
import { ModifyTaskTypeHandler } from "./api/v1/cqrs/commands/handlers/modify-task-type.handler";
import { ModifyTaskStatusHandler } from "./api/v1/cqrs/commands/handlers/modify-task-status.handler";
import { DeleteTaskHandler } from "./api/v1/cqrs/commands/handlers/delete-task.handler";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), LibraryModule, CqrsModule],
  controllers: [TaskV1Controller],
  providers: [
    { provide: Transactional, useClass: TaskTransactionInitializer },
    // common
    ...[TaskTransactionInitializer],
    // logic
    ...[
      // cqrs handlers
      ...[
        // commands
        ...[
          CreateTaskHandler,
          ChangeTaskSeqHandler,
          ModifyTaskTitleHandler,
          ModifyTaskTypeHandler,
          ModifyTaskStatusHandler,
          DeleteTaskHandler,
        ],
        // queries
        ...[FetchTasksWithStartDateHandler],
      ],
    ],
  ],
  exports: [],
})
export class TaskModule {}
