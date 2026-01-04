import { ICommand } from "@nestjs/cqrs";
import { TaskBody } from "../../../../dto/request/task-body.dto";

export class CreateTaskCommand implements ICommand {
  constructor(public readonly body: TaskBody) {}
}
