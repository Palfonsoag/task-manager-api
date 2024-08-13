import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Priority, TasksStatus } from './tasks-enums';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository', { timestamp: true });
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(task: CreateTaskDto, user: User): Promise<void> {
    try {
      const { title, description, assignedTo, priority, dueDate } = task;
      const taskCreated = this.create({
        title,
        description,
        status: assignedTo ? TasksStatus.OPEN : TasksStatus.UNASSIGNED,
        createdBy: user,
        assignedTo: assignedTo || undefined,
        priority: priority || Priority.P3,
        dueDate:
          dueDate ||
          new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        hide: false,
      });
      await this.save(taskCreated);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status, assignedTo, priority, createdBy } = filterDto;
    const query = this.createQueryBuilder('task');

    query.where({ hide: false });
    if (createdBy) {
      query.andWhere({ createdBy: user });
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (priority) {
      query.andWhere('task.priority = :priority', { priority });
    }

    if (assignedTo) {
      query.andWhere({ assignedTo });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();

      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${user.username}. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
