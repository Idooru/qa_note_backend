import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ModifyTaskTypeCommand } from "../events/modify-task-type.command";
import { Implemented } from "../../../../../../../common/decorators/implemented.decoration";
import { Transactional } from "../../../../../../../common/interfaces/initializer/transactional";
import { TaskRepositoryPayload } from "../../../../common/task-repository.payload";
import { ModifyTaskTypeDto } from "../../../../dto/request/modify-task-type.dto";

@CommandHandler(ModifyTaskTypeCommand)
export class ModifyTaskTypeHandler implements ICommandHandler<ModifyTaskTypeCommand> {
  constructor(private readonly transaction: Transactional<TaskRepositoryPayload>) {}

  private async modifyTaskType(dto: ModifyTaskTypeDto): Promise<void> {
    const { id, type } = dto;

    await this.transaction.getRepository().task.update(id, { type });
  }

  @Implemented()
  public async execute(command: ModifyTaskTypeCommand): Promise<void> {
    const { dto } = command;

    this.transaction.initRepository();
    await this.modifyTaskType(dto);
  }
}
