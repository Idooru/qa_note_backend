import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindTasksWithStartDateQuery } from "../events/find-tasks-with-start-date.query";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskEntity } from "../../../../../entities/task.entity";
import { Repository } from "typeorm";

@QueryHandler(FindTasksWithStartDateQuery)
export class FindTasksWithStartDateHandler implements IQueryHandler<FindTasksWithStartDateQuery> {
  constructor(
    @InjectRepository(TaskEntity)
    public readonly repository: Repository<TaskEntity>,
  ) {}

  public execute(query: FindTasksWithStartDateQuery): Promise<TaskEntity[]> {
    const { startDate } = query;
    return this.repository.createQueryBuilder("task").where("task.startDate = :startDate", { startDate }).getMany();
  }
}
