import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { Music } from './entities/music.entity';
import { DeepPartial, DeleteResult, In } from 'typeorm';
import { ArtistRepository } from 'src/artist/artist.repository';
import { AlbumRepository } from 'src/album/album.repository';

@Injectable()
export class MusicService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository
  ) { }

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    const { title, releaseYear, genre, artistIds, albumId } = createMusicDto;

    const artists = await this.artistRepository.find({ where: { id: In(artistIds) } });
    const album = await this.albumRepository.findOne(albumId);

    const musicData: DeepPartial<Music> = {
      title,
      releaseYear,
      genre,
      artists,
      album
    }

    const music = this.musicRepository.create(musicData)

    return music;
  }

  async findAll(): Promise<Music[]> {
    return this.musicRepository.find({
      relations: ['albums', 'artists']
    });
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
