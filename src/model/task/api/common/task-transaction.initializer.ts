import { Injectable } from "@nestjs/common";
import { TaskRepositoryPayload } from "./task-repository.payload";
import { TaskEntity } from "../../entities/task.entity";
import { Implemented } from "../../../../common/decorators/implemented.decoration";
import { Transactional } from "../../../../common/interfaces/initializer/transactional";
import { TransactionHandler } from "../../../../common/lib/handler/transaction.handler";

@Injectable()
export class TaskTransactionInitializer extends Transactional<TaskRepositoryPayload> {
  private payload: TaskRepositoryPayload;

  constructor(private readonly handler: TransactionHandler) {
    super();
  }

  @Implemented()
  public initRepository(): void {
    const queryRunner = this.handler.getQueryRunner();

    this.payload = {
      task: queryRunner.manager.getRepository(TaskEntity),
    };
  }

  @Implemented()
  public getRepository(): TaskRepositoryPayload {
    return this.payload;
  }
}
