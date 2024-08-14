import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { User } from '../user/user.entity';
import { Task } from './task.entity';
import { UserService } from '../user/user.service';

const mockUser: User = {
  id: 'myTestId',
  username: 'ammar_alkhooly',
  email: 'email@email.com',
  password: 'testPassword',
  name: 'user',
  tasks: [],
  tasksCreated: [],
};

const tasks: Task[] = [];

export const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis().mockResolvedValue(tasks),
  })),
  create: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

const mockUserService = () => ({ findUserById: jest.fn() });

describe('TasksService', () => {
  let service: TasksService;
  let repository: TaskRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserService, useFactory: mockUserService },
        { provide: TaskRepository, useFactory: mockTaskRepository },
        TasksService,
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TaskRepository>(TaskRepository);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
