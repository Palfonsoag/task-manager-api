import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

const mockTaskService = () => ({
  getTasks: jest.fn(),
  updateTaskStatus: jest.fn(),
  getTaskById: jest.fn(),
  createTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTaskPriority: jest.fn(),
  updateTaskAssignee: jest.fn(),
  hideTask: jest.fn(),
});

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useFactory: mockTaskService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
