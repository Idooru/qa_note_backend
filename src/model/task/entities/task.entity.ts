import { Column, Entity } from "typeorm";
import { CommonEntity } from "../../../common/entities/common.entity";
import { TaskType, taskType } from "../types/task-type.type";

@Entity({ name: "tasks", synchronize: true })
export class TaskEntity extends CommonEntity {
  @Column({ type: "int", unsigned: true, nullable: false })
  public seq: number;

  @Column({ type: "varchar", length: 30, nullable: false })
  public title: string;

  @Column({ type: "enum", enum: taskType })
  public type: TaskType;

  @Column({ type: "boolean", default: false })
  public complete: boolean;

  @Column({ type: "varchar", length: 10 })
  public startDate: string;
}
