import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, email, password, name } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = this.create({
      username,
      email,
      password: hashedPassword,
      name,
    });
    try {
      await this.save(userCreated);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('duplicated user');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
