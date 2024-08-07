import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async findUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, email } = authCredentialsDto;

    let user: User;
    if (email) {
      user = await this.userRepository.findOneBy({ email });
    }

    if (username) {
      user = await this.userRepository.findOneBy({ username });
    }

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }
}
