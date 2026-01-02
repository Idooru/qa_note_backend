import { Entity } from 'typeorm';
import { CommonEntity } from '../../../common/entities/common.entity';

@Entity({ name: 'tasks', synchronize: true })
export class TaskEntity extends CommonEntity {}
