import { IsArray, IsUUID } from "class-validator";

export class DeleteTaskDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  ids: string[];
}
