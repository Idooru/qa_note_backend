import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteTaskCommand } from "../events/delete-task.command";
import { Implemented } from "../../../../../../../common/decorators/implemented.decoration";
import { Transactional } from "../../../../../../../common/interfaces/initializer/transactional";
import { TaskRepositoryPayload } from "../../../../common/task-repository.payload";

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly transaction: Transactional<TaskRepositoryPayload>) {}

  private async deleteTask(id: string): Promise<void> {
    await this.transaction.getRepository().task.delete(id);
  }

  @Implemented()
  public async execute(command: DeleteTaskCommand): Promise<void> {
    const { dto } = command;
    const { ids } = dto;

    this.transaction.initRepository();
    const result = ids.map((id) => this.deleteTask(id));
    await Promise.all(result);
  }
}
