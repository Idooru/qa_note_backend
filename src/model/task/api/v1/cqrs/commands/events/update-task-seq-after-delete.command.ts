import { ICommand } from "@nestjs/cqrs";

export class UpdateTaskSeqAfterDeleteCommand implements ICommand {
  constructor(public startDate: string) {}
}
