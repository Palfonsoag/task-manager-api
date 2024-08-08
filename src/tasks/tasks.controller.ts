import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { UpdateTaskAssigneeDto } from './dto/update-task-assignee.dto';
import { HideTaskDto } from './dto/hide-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): void {
    this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, user);
  }

  @Patch('/:id/priority')
  updateTaskPriority(
    @Param('id') id: string,
    @Body() updateTaskPriorityDto: UpdateTaskPriorityDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskPriority(
      id,
      updateTaskPriorityDto,
      user,
    );
  }
  @Patch('/:id/assignee')
  updateTaskAssignee(
    @Param('id') id: string,
    @Body() updateTaskAssigneeDto: UpdateTaskAssigneeDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskAssignee(
      id,
      updateTaskAssigneeDto,
      user,
    );
  }

  @Patch('/:id/hide')
  hideTask(
    @Param('id') id: string,
    @Body() hideTasks: HideTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.hideTask(id, hideTasks, user);
  }
}
