import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CapitalizeFirst } from 'src/utils/capitalizeFitst';
import { CleanString } from 'src/utils/cleanString';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @CapitalizeFirst()
  @CleanString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
