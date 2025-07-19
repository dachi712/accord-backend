import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { CapitalizeFirst } from 'src/utils/capitalizeFitst';
import { CleanString } from 'src/utils/cleanString';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @CleanString()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  artistIds: number[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  albumId: number;

  @IsNumber()
  @IsPositive()
  releaseYear: number;

  @IsString()
  @IsNotEmpty()
  @CapitalizeFirst()
  @CleanString()
  genre: string;
}
