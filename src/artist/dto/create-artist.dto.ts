import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CapitalizeFirst } from '../../utils/capitalizeFirst';
import { CleanString } from '../../utils/cleanString';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @CleanString()
  @CapitalizeFirst()
  name: string;

  @IsString()
  @IsNotEmpty()
  @CleanString()
  @CapitalizeFirst()
  genre: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
