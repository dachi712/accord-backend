import { Trim } from 'class-sanitizer';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CapitalizeFirst } from 'src/utils/capitalizeFitst';
import { CleanString } from 'src/utils/cleanString';

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
