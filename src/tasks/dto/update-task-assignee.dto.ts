import { IsString } from 'class-validator';

export class UpdateTaskAssigneeDto {
  @IsString()
  assignee: string;
}
