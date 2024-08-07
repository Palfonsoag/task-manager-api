import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { password } = authCredentialsDto;
    const user = await this.userService.findUser(authCredentialsDto);

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }
}
