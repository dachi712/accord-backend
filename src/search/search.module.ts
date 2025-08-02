import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from '../music/entities/music.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Artist, Album])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
