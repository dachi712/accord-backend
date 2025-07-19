import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CleanString } from 'src/utils/cleanString';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @CleanString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
