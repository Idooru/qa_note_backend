import { taskType, TaskType } from "../../../types/task-type.type";
import { IsEnum, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";
import { warnEnumMessage } from "../../../../../common/function/warn-enum-message";

export class TaskBody {
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsEnum(taskType, { message: warnEnumMessage(taskType) })
  @IsString()
  @IsNotEmpty()
  public type: TaskType;

  @Matches(/^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01])$/, {
    message: "startDate must be in yyyy-m-d or yyyy-mm-dd format",
  })
  @IsString()
  @IsNotEmpty()
  public startDate: string;
}
