import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { Priority, TasksStatus } from './tasks-enums';
import { User } from '../user/user.entity';
import { Exclude } from 'class-transformer';

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

  @Column('enum', { enum: Priority, enumName: 'Priority Enum' })
  priority: Priority;

  @CreateDateColumn()
  createdAt: Date;

  @Column('date')
  dueDate: Date;

  @Column('boolean')
  hide: Boolean;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: true })
  @Exclude({ toPlainOnly: true })
  assignedTo?: User;

  @ManyToOne((_type) => User, (user) => user.tasksCreated, { eager: true })
  @Exclude({ toPlainOnly: true })
  createdBy: User;
}
