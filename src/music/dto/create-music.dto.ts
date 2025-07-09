import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { CapitalizeFirst } from 'src/utils/capitalizeFitst';
import { CleanString } from 'src/utils/cleanString';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @CleanString()
  title: string;

  @IsString()
  @IsNotEmpty()
  @CapitalizeFirst()
  @CleanString()
  artist: string;

  @IsNumber()
  @IsPositive()
  releaseYear: number;

  @IsString()
  @IsNotEmpty()
  @CapitalizeFirst()
  @CleanString()
  genre: string;
}
