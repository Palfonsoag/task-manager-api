import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Priority, TasksStatus } from './tasks-enums';
import { CreateTaskDto } from './dto/create-task.dto';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('enum', { enum: TasksStatus, enumName: 'Status Enum' })
  status: TasksStatus;

  @Column()
  assignedTo?: string;

  @Column()
  createdBy: string;

  @Column('enum', { enum: Priority, enumName: 'Priority Enum' })
  priority: Priority;

  @CreateDateColumn()
  createdAt: Date;

  @Column('date')
  dueDate: Date;

  @Column('boolean')
  hide: Boolean;
}
