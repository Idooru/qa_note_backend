import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class ModifyTaskTitleDto {
  @IsUUID()
  id: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  public title: string;
}
