import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { CapitalizeFirst } from 'src/utils/capitalizeFitst';
import { CleanString } from 'src/utils/cleanString';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @CleanString()
  @CapitalizeFirst()
  title: string;

  @IsNumber()
  @IsPositive()
  releaseYear: number;

  @IsString()
  @IsNotEmpty()
  @CleanString()
  @CapitalizeFirst()
  genre: string;
}
