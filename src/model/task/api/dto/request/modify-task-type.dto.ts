import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { TaskType, taskType } from "../../../types/task-type.type";
import { warnEnumMessage } from "../../../../../common/function/warn-enum-message";

export class ModifyTaskTypeDto {
  @IsUUID()
  id: string;

  @IsEnum(taskType, { message: warnEnumMessage(taskType) })
  @IsString()
  @IsNotEmpty()
  public type: TaskType;
}
