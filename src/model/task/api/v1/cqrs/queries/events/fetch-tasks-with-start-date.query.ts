import { IQuery } from "@nestjs/cqrs";

export type FetchMode = "month" | "full";

export class FetchTasksWithStartDateQuery implements IQuery {
  constructor(
    public startDate: string,
    public mode: FetchMode,
  ) {}
}
