import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { User } from '../user/user.entity';
import { Task } from './task.entity';
import { UserService } from '../user/user.service';
import { Priority, TasksStatus } from './tasks-enums';

const mockUser: User = {
  id: 'myTestId',
  username: 'random_user',
  email: 'email@email.com',
  password: 'testPassword',
  name: 'user',
  tasks: [],
  tasksCreated: [],
};

const mockTaskResults: Task[] = [
  {
    id: 'mockId1',
    title: 'mock Title 1',
    description: '',
    status: TasksStatus.IN_PROGRESS,
    priority: Priority.P1,
    hide: false,
    createdAt: new Date('10/10/2024'),
    createdBy: mockUser,
    dueDate: new Date('10/11/2024'),
  },
  {
    id: 'mockId2',
    title: 'mock Title 2',
    description: '',
    status: TasksStatus.IN_PROGRESS,
    priority: Priority.P1,
    hide: false,
    createdAt: new Date('10/10/2024'),
    createdBy: mockUser,
    dueDate: new Date('10/11/2024'),
  },
];

export const mockTaskRepository = () => ({
  getTasks: jest.fn().mockResolvedValue(mockTaskResults),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis().mockResolvedValue(mockTaskResults),
  })),
  create: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn().mockResolvedValue(mockTaskResults[0]),
});

const mockUserService = () => ({ findUserById: jest.fn() });

describe('TasksService', () => {
  let service: TasksService;
  let repository: jest.Mocked<TaskRepository>;
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
    repository = module.get<jest.Mocked<TaskRepository>>(TaskRepository);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('should call TaskRepository.getTasks return all tasks', async () => {
      const result = await service.getTasks({}, mockUser);

      expect(result).toEqual(mockTaskResults);
    });
  });

  describe('getTaskById', () => {
    it('should call TaskRepository.findOneBy return a task', async () => {
      const result = await service.getTaskById(mockTaskResults[0].id);

      expect(result).toEqual(mockTaskResults[0]);
    });

    it('should call TaskRepository.findOneBy and handle the error', async () => {
      repository.findOneBy.mockResolvedValue(null);

      expect(service.getTaskById(mockTaskResults[0].id)).rejects.toThrow(
        `Task with ID "${mockTaskResults[0].id}" not found`,
      );
    });
  });
});
