import { ICommand } from "@nestjs/cqrs";
import { ChangeTaskSeqDto } from "../../../../dto/request/change-task-seq.dto";

export class ChangeTaskSeqCommand implements ICommand {
  constructor(public readonly dto: ChangeTaskSeqDto) {}
}
