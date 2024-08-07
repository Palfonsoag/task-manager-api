import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'does not match the criteria',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  email: string;
}
