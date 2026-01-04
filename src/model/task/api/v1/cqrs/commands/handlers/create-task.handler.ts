import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CreateTaskCommand } from "../events/create-task.command";
import { Implemented } from "../../../../../../../common/decorators/implemented.decoration";
import { Transactional } from "../../../../../../../common/interfaces/initializer/transactional";
import { TaskRepositoryPayload } from "../../../../common/task-repository.payload";
import { TaskEntity } from "../../../../../entities/task.entity";
import { FindTasksWithStartDateQuery } from "../../queries/events/find-tasks-with-start-date.query";
import { TaskType } from "../../../../../types/task-type.type";

interface CreateTaskProps {
  seq: number;
  title: string;
  type: TaskType;
  startDate: string;
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly transaction: Transactional<TaskRepositoryPayload>,
  ) {}

  private findTasks(startDate: string): Promise<TaskEntity[]> {
    const query = new FindTasksWithStartDateQuery(startDate);
    return this.queryBus.execute(query);
  }

  private calculateSeq(tasks: TaskEntity[]): number {
    return tasks.length ? Math.max(...tasks.map((task) => task.seq)) + 1 : 1;
  }

  private createTask(props: CreateTaskProps): Promise<TaskEntity> {
    return this.transaction.getRepository().task.save(props);
  }

  @Implemented()
  public async execute(command: CreateTaskCommand): Promise<TaskEntity> {
    const { body } = command;
    const tasks = await this.findTasks(body.startDate);
    const seq = this.calculateSeq(tasks);
    const props: CreateTaskProps = { seq, title: body.title, type: body.type, startDate: body.startDate };

    this.transaction.initRepository();
    return this.createTask(props);
  }
}
