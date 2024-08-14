import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';

const users: User[] = [];

export const mockUserRepository = () => ({
  createUser: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis().mockResolvedValue(users),
  })),
  create: jest.fn(),
  delete: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
