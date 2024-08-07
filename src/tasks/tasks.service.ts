import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Priority, TasksStatus } from './tasks-enums';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const taskFound = await this.taskRepository.findOneBy({ id });
      if (!taskFound) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      return taskFound;
    } catch (error) {
      throw new InternalServerErrorException(`with the database:/n ${error}`);
    }
  }

  createTask(task: CreateTaskDto): Promise<void> {
    return this.taskRepository.createTask(task);
  }

  async deleteTask(id: string): Promise<void> {
    const deletedTask = await this.taskRepository.delete({ id });

    if (deletedTask.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    taskUpdated: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = taskUpdated.status;
    await this.taskRepository.save(task);
    return task;
  }

  async updateTaskPriority(
    id: string,
    taskUpdated: UpdateTaskPriorityDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    task.priority = taskUpdated.priority;
    await this.taskRepository.save(task);
    return task;
  }
}
