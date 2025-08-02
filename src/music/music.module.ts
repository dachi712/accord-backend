import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { MusicRepository } from './music.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { AlbumRepository } from '../album/album.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Music, Artist, Album])],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository, ArtistRepository, AlbumRepository],
  exports: [MusicService],
})
export class MusicModule {}
