import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Priority, TasksStatus } from './tasks-enums';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(task: CreateTaskDto): Promise<void> {
    try {
      const { title, description, createdBy, assignedTo, priority, dueDate } =
        task;
      const taskCreated = this.create({
        title,
        description,
        status: assignedTo ? TasksStatus.OPEN : TasksStatus.UNASSIGNED,
        createdBy,
        assignedTo: assignedTo || '',
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

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status, assignedTo, priority } = filterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (priority) {
      query.andWhere('task.priority = :priority', { priority });
    }

    if (assignedTo) {
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
