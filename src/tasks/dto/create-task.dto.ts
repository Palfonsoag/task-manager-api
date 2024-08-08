import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Priority } from '../tasks-enums';
import { User } from 'src/user/user.entity';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  assignedTo?: User;

  @IsOptional()
  @IsString()
  priority?: Priority;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}
