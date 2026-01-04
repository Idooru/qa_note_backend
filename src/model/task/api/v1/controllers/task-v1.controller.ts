import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { TransactionInterceptor } from "../../../../../common/interceptors/general/transaction.interceptor";
import { ApiResultInterface } from "../../../../../common/interceptors/interface/api-result.interface";
import { CommandBus } from "@nestjs/cqrs";
import { TaskBody } from "../../dto/request/task-body.dto";
import { CreateTaskCommand } from "../cqrs/commands/events/create-task.command";
import { TaskEntity } from "../../../entities/task.entity";

@Controller({ path: "/task", version: "1" })
export class TaskV1Controller {
  constructor(private readonly commandBus: CommandBus) {}

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
}
