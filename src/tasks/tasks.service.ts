import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UpdateTaskAssigneeDto } from './dto/update-task-assignee.dto';
import { TasksStatus } from './tasks-enums';
import { HideTaskDto } from './dto/hide-task.dto';

@Injectable()
export class TasksService {
  constructor(
    private taskRepository: TaskRepository,
    private userService: UserService,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
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

  createTask(task: CreateTaskDto, user: User): Promise<void> {
    return this.taskRepository.createTask(task, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const task = await this.getTaskById(id);
    if (
      (task.assignedTo && task.assignedTo.id === user.id) ||
      task.createdBy.id === user.id
    ) {
      const deletedTask = await this.taskRepository.delete({ id });
      if (deletedTask.affected === 0) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
    } else {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    taskUpdated: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    if (task.assignedTo && task.assignedTo.id === user.id) {
      task.status = taskUpdated.status;
      await this.taskRepository.save(task);
      return task;
    } else {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskPriority(
    id: string,
    taskUpdated: UpdateTaskPriorityDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    if (
      (task.assignedTo && task.assignedTo.id === user.id) ||
      task.createdBy.id === user.id
    ) {
      task.priority = taskUpdated.priority;
      await this.taskRepository.save(task);
      return task;
    } else {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskAssignee(
    id: string,
    assignedTo: UpdateTaskAssigneeDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    const assignedUser = await this.userService.findUserById(
      assignedTo.assignee,
    );
    if (
      (task.assignedTo && task.assignedTo.id === user.id) ||
      task.createdBy.id === user.id
    ) {
      task.assignedTo = assignedUser;
      task.status = TasksStatus.OPEN;
      await this.taskRepository.save(task);
      return task;
    } else {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async hideTask(id: string, hideTask: HideTaskDto, user: User): Promise<Task> {
    const task = await this.getTaskById(id);
    if (
      ((task.assignedTo && task.assignedTo.id === user.id) ||
        task.createdBy.id === user.id) &&
      task.status === TasksStatus.DONE
    ) {
      task.hide = hideTask.hide;
      await this.taskRepository.save(task);
      return task;
    } else {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
