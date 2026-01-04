import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FetchTasksWithStartDateQuery } from "../events/fetch-tasks-with-start-date.query";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "../../../../../entities/task.entity";
import { Repository } from "typeorm";

@QueryHandler(FetchTasksWithStartDateQuery)
export class FetchTasksWithStartDateHandler implements IQueryHandler<FetchTasksWithStartDateQuery> {
  constructor(
    @InjectRepository(TaskEntity)
    public readonly repository: Repository<TaskEntity>,
  ) {}

  public async execute(query: FetchTasksWithStartDateQuery): Promise<TaskEntity[]> {
    const { startDate, mode } = query;

    if (mode === "full") {
      return this.repository
        .createQueryBuilder("task")
        .where("task.startDate = :startDate", { startDate })
        .orderBy("task.seq", "ASC")
        .getMany();
    } else {
      const startDateMonth = startDate.split("-").slice(0, 2).join("-"); // "2026-1"

      return this.repository
        .createQueryBuilder("task")
        .where("task.startDate LIKE :month", {
          month: `${startDateMonth}-%`,
        })
        .orderBy("task.startDate", "ASC")
        .getMany();
    }
  }
}
