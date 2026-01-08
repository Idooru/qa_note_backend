import { ICommand } from "@nestjs/cqrs";
import { ModifyTaskStatusDto } from "../../../../dto/request/modify-task-status.dto";

export class ModifyTaskStatusCommand implements ICommand {
  constructor(public readonly dto: ModifyTaskStatusDto) {}
}
