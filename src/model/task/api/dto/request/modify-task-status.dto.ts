import { IsArray, IsBoolean, IsUUID } from "class-validator";

export class ModifyTaskStatusDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  ids: string[];

  @IsBoolean()
  status: boolean;
}
