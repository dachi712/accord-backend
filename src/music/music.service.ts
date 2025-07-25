import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { Music } from './entities/music.entity';
import { DeepPartial, DeleteResult } from 'typeorm';
import { ArtistRepository } from '../artist/artist.repository';
import { AlbumRepository } from '../album/album.repository';

@Injectable()
export class MusicService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository
  ) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const { title, releaseYear, genre, artistId, albumId } = createMusicDto;

    const artist = await this.artistRepository.findOne(artistId);
    const album = await this.albumRepository.findOne(albumId);

    const musicData: DeepPartial<Music> = {
      title,
      releaseYear,
      genre,
      artist,
      album,
    };

    const music = this.musicRepository.create(musicData);

    return music;
  }

  async findAll(): Promise<Music[]> {
    const results = await this.musicRepository.find();

    if (results.length === 0) {
      throw new NotFoundException('No Musics Found In Database');
    }

    return results;
  }

  async findOne(id: number): Promise<Music> {
    return this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto): Promise<Music> {
    return this.musicRepository.update(id, updateMusicDto);
  }

  async softRemove(id: number): Promise<Music> {
    return this.musicRepository.softRemove(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.musicRepository.remove(id);
  }
}
