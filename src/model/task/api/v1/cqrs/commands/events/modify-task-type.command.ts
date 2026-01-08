import { ICommand } from "@nestjs/cqrs";
import { ModifyTaskTypeDto } from "../../../../dto/request/modify-task-type.dto";

export class ModifyTaskTypeCommand implements ICommand {
  constructor(public readonly dto: ModifyTaskTypeDto) {}
}
