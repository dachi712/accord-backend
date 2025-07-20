import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/music/entities/music.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Music) private musicRepository: Repository<Music>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
    @InjectRepository(Album) private albumRepository: Repository<Album>
  ) {}

  async search(query: string) {
    const like = `%${query}%`;

    const music = await this.musicRepository
      .createQueryBuilder('music')
      .where('music.title LIKE :like', { like })
      .getMany();

    const artists = await this.artistRepository
      .createQueryBuilder('artist')
      .where('artist.name LIKE :like', { like })
      .getMany();

    const albums = await this.albumRepository
      .createQueryBuilder('albums')
      .where('albums.title LIKE :like', { like })
      .getMany();

    return { music, artists, albums };
  }
}
