import { ICommand } from "@nestjs/cqrs";
import { ModifyTaskTitleDto } from "../../../../dto/request/modify-task-title.dto";

export class ModifyTaskTitleCommand implements ICommand {
  constructor(public readonly dto: ModifyTaskTitleDto) {}
}
