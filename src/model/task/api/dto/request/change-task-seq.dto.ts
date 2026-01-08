import { ArrayNotEmpty, IsArray, IsInt, IsUUID, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ChangeTaskTuple {
  @IsUUID()
  id: string;

  @IsInt()
  @Min(0)
  seq: number;
}

export class ChangeTaskSeqDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ChangeTaskTuple)
  tasks: ChangeTaskTuple[];
}
