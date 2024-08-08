import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany((_type) => Task, (task) => task.assignedTo, { eager: false })
  tasks: Task[];

  @OneToMany((_type) => Task, (task) => task.createdBy, { eager: false })
  tasksCreated:Task[]
}
