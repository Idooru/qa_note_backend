import { Repository } from "typeorm";
import { TaskEntity } from "../../entities/task.entity";

export interface TaskRepositoryPayload {
  task: Repository<TaskEntity>;
}
