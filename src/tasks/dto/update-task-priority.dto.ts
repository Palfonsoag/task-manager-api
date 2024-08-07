import { IsEnum } from 'class-validator';
import { Priority } from '../tasks-enums';

export class UpdateTaskPriorityDto {
  @IsEnum(Priority)
  priority: Priority;
}
