import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from '../music/entities/music.entity';
import { Repository } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    @InjectRepository(Album) private albumRepository: Repository<Album>
  ) {}

  async search(query: string, limit?: number, offset?: number) {
    const like = `%${query}%`;

    const musicQuery = this.musicRepository
      .createQueryBuilder('music')
      .where('music.title LIKE :like', { like });

    if (limit) {
      musicQuery.limit(limit);
    }

    if (offset) {
      musicQuery.offset(offset);
    }

    const music = await musicQuery.getMany();

    const artistQuery = this.artistRepository
      .createQueryBuilder('artist')
      .where('artist.name LIKE :like', { like });

    if (limit) {
      artistQuery.limit(limit);
    }

    if (offset) {
      artistQuery.offset(offset);
    }

    const artist = await artistQuery.getMany();

    const albumQuery = this.albumRepository
      .createQueryBuilder('albums')
      .where('albums.title LIKE :like', { like });

    if (limit) {
      albumQuery.limit(limit);
    }

    if (offset) {
      albumQuery.offset(offset);
    }

    const album = await albumQuery.getMany();

    return { music, artist, album };
  }
}
