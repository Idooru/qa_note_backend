import { IQuery } from "@nestjs/cqrs";

export class FindTasksWithStartDateQuery implements IQuery {
  constructor(public startDate: string) {}
}
