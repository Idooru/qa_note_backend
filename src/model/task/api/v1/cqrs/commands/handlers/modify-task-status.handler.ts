import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ModifyTaskStatusCommand } from "../events/modify-task-status.command";
import { Implemented } from "../../../../../../../common/decorators/implemented.decoration";
import { TaskRepositoryPayload } from "../../../../common/task-repository.payload";
import { Transactional } from "../../../../../../../common/interfaces/initializer/transactional";

@CommandHandler(ModifyTaskStatusCommand)
export class ModifyTaskStatusHandler implements ICommandHandler<ModifyTaskStatusCommand> {
  constructor(private readonly transaction: Transactional<TaskRepositoryPayload>) {}

  private async modifyTaskStatus(id: string, status: boolean): Promise<void> {
    await this.transaction.getRepository().task.update(id, { complete: status });
  }

  @Implemented()
  public async execute(command: ModifyTaskStatusCommand): Promise<void> {
    const { dto } = command;
    const { ids, status } = dto;

    console.log(ids);
    console.log(status);

    this.transaction.initRepository();
    const result = ids.map((id) => this.modifyTaskStatus(id, status));
    await Promise.all(result);
  }
}
