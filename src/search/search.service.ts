import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from '../music/entities/music.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { SearchResult } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>
  ) {}

  async search(
    query: string,
    limit?: number,
    offset?: number
  ): Promise<SearchResult> {
    const like = `%${query}%`;

    const musicQuery = this.musicRepository
      .createQueryBuilder('music')
      .where('music.title LIKE :like', { like });

    if (limit) musicQuery.limit(limit);
    if (offset) musicQuery.offset(offset);

    const music = await musicQuery.getMany();

    const artistQuery = this.artistRepository
      .createQueryBuilder('artist')
      .where('artist.name LIKE :like', { like });

    if (limit) artistQuery.limit(limit);
    if (offset) artistQuery.offset(offset);

    const artists = await artistQuery.getMany();

    const albumQuery = this.albumRepository
      .createQueryBuilder('album')
      .where('album.title LIKE :like', { like });

    if (limit) albumQuery.limit(limit);
    if (offset) albumQuery.offset(offset);

    const albums = await albumQuery.getMany();

    return {
      music,
      artists,
      albums,
    };
  }
}
