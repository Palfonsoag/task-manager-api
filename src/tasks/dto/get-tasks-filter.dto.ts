import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority, TasksStatus } from '../tasks-enums';
import { User } from 'src/user/user.entity';

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
  assignedTo?: User;

  @IsOptional()
  createdBy?: User;
}
