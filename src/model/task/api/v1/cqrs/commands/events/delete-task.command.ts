import { ICommand } from "@nestjs/cqrs";
import { DeleteTaskDto } from "../../../../dto/request/delete-task.dto";

export class DeleteTaskCommand implements ICommand {
  constructor(public readonly dto: DeleteTaskDto) {}
}
