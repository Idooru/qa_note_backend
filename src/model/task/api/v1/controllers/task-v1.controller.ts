import { Body, Controller, Get, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { TransactionInterceptor } from "../../../../../common/interceptors/general/transaction.interceptor";
import { ApiResultInterface } from "../../../../../common/interceptors/interface/api-result.interface";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { TaskBody } from "../../dto/request/task-body.dto";
import { CreateTaskCommand } from "../cqrs/commands/events/create-task.command";
import { TaskEntity } from "../../../entities/task.entity";
import { FetchInterceptor } from "../../../../../common/interceptors/general/fetch.interceptor";
import { FetchMode, FetchTasksWithStartDateQuery } from "../cqrs/queries/events/fetch-tasks-with-start-date.query";
import { ChangeTaskSeqDto } from "../../dto/request/change-task-seq.dto";
import { ChangeTaskSeqCommand } from "../cqrs/commands/events/change-task-seq.command";

@Controller({ path: "/task", version: "1" })
export class TaskV1Controller {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @UseInterceptors(FetchInterceptor)
  @Get("/")
  public async fetchTasks(
    @Query("start-date") startDate: string,
    @Query("mode") mode: FetchMode,
  ): Promise<ApiResultInterface<TaskEntity[]>> {
    const query = new FetchTasksWithStartDateQuery(startDate, mode);
    const result: TaskEntity[] = await this.queryBus.execute(query);

    console.log(result);

    return {
      statusCode: 200,
      message: "생성날짜에 해당하는 테스크를 불러옵니다.",
      result,
    };
  }

  @UseInterceptors(TransactionInterceptor)
  @Post("/")
  public async createTask(@Body() body: TaskBody): Promise<ApiResultInterface<TaskEntity>> {
    const command = new CreateTaskCommand(body);
    const result: TaskEntity = await this.commandBus.execute(command);

    return {
      statusCode: 201,
      message: "테스크를 생성하였습니다.",
      result,
    };
  }

  @UseInterceptors(TransactionInterceptor)
  @Patch("/seq")
  public async changeTaskSeq(@Body() dto: ChangeTaskSeqDto): Promise<ApiResultInterface<void>> {
    const command = new ChangeTaskSeqCommand(dto);
    await this.commandBus.execute(command);

    return { statusCode: 200, message: "테스크 순서가 변경되었습니다." };
  }
}
