import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { CapitalizeFirst } from '../../utils/capitalizeFitst';
import { CleanString } from '../../utils/cleanString';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @CleanString()
  title: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  artistId: number;

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
