import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PassportModule } from '@nestjs/passport';

export const mockJWTService = () => ({ signAsync: jest.fn() });

const mockUserService = () => ({ findUser: jest.fn(), createUser: jest.fn() });

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        AuthService,
        { provide: JwtService, useFactory: mockJWTService },
        { provide: UserService, useFactory: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
