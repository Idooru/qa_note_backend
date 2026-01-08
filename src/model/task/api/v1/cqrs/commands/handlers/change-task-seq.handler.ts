import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ChangeTaskSeqCommand } from "../events/change-task-seq.command";
import { TaskRepositoryPayload } from "../../../../common/task-repository.payload";
import { Transactional } from "../../../../../../../common/interfaces/initializer/transactional";
import { Implemented } from "../../../../../../../common/decorators/implemented.decoration";
import { ChangeTaskTuple } from "../../../../dto/request/change-task-seq.dto";

@CommandHandler(ChangeTaskSeqCommand)
export class ChangeTaskSeqHandler implements ICommandHandler<ChangeTaskSeqCommand> {
  constructor(private readonly transaction: Transactional<TaskRepositoryPayload>) {}

  private async changeTaskSeq(task: ChangeTaskTuple): Promise<void> {
    const { id, seq } = task;

    await this.transaction.getRepository().task.update(id, { seq });
  }

  @Implemented()
  public async execute(command: ChangeTaskSeqCommand): Promise<void> {
    const { dto } = command;
    const { tasks } = dto;

    this.transaction.initRepository();
    const result = tasks.map((task) => this.changeTaskSeq(task));
    await Promise.all(result);
  }
}
