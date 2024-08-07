import { IsEnum } from 'class-validator';
import { TasksStatus } from '../tasks-enums';

export class UpdateTaskStatusDto {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
