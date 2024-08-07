import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority, TasksStatus } from '../tasks-enums';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TasksStatus)
  status?: TasksStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(Priority)
  priority?: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;
}
