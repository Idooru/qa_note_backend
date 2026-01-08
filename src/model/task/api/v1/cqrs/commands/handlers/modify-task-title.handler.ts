import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ModifyTaskTitleCommand } from "../events/modify-task-title.command";
import { Implemented } from "../../../../../../../common/decorators/implemented.decoration";
import { Transactional } from "../../../../../../../common/interfaces/initializer/transactional";
import { TaskRepositoryPayload } from "../../../../common/task-repository.payload";
import { ModifyTaskTitleDto } from "../../../../dto/request/modify-task-title.dto";

@CommandHandler(ModifyTaskTitleCommand)
export class ModifyTaskTitleHandler implements ICommandHandler<ModifyTaskTitleCommand> {
  constructor(private readonly transaction: Transactional<TaskRepositoryPayload>) {}

  private async modifyTaskTitle(dto: ModifyTaskTitleDto): Promise<void> {
    const { id, title } = dto;

    await this.transaction.getRepository().task.update(id, { title });
  }

  @Implemented()
  public async execute(command: ModifyTaskTitleCommand): Promise<void> {
    const { dto } = command;

    this.transaction.initRepository();
    await this.modifyTaskTitle(dto);
  }
}
