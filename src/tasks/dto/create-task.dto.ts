import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority } from '../tasks-enums';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsOptional()
  @IsString()
  assignedTo?: string;

  @IsOptional()
  @IsString()
  priority?: Priority;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}
