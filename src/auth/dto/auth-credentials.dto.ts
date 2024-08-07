import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(12)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
