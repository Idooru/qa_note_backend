import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateTaskSeqAfterDeleteCommand } from "../events/update-task-seq-after-delete.command";
import { Implemented } from "../../../../../../../common/decorators/implemented.decoration";
import { Transactional } from "../../../../../../../common/interfaces/initializer/transactional";
import { TaskRepositoryPayload } from "../../../../common/task-repository.payload";

@CommandHandler(UpdateTaskSeqAfterDeleteCommand)
export class UpdateTaskSeqAfterDeleteHandler implements ICommandHandler<UpdateTaskSeqAfterDeleteCommand> {
  constructor(private readonly transaction: Transactional<TaskRepositoryPayload>) {}

  private async updateTaskSeq(startDate: string): Promise<void> {
    await this.transaction.getRepository().task.query(
      `
        UPDATE tasks t
        INNER JOIN (
          SELECT id, ROW_NUMBER() OVER (ORDER BY seq ASC) AS new_seq
          FROM tasks
          WHERE startDate = ?
        ) r ON t.id = r.id
        SET t.seq = r.new_seq
  `,
      [startDate],
    );
  }

  @Implemented()
  public async execute(command: UpdateTaskSeqAfterDeleteCommand): Promise<void> {
    const { startDate } = command;

    this.transaction.initRepository();
    await this.updateTaskSeq(startDate);
  }
}
