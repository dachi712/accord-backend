import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { Music } from './entities/music.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MusicService {
  constructor(private readonly musicRepository: MusicRepository) {}

  async create(createMusicDto: CreateMusicDto): Promise<Music> {
    return this.musicRepository.create(createMusicDto);
  }

  async findAll(): Promise<Music[]> {
    return this.musicRepository.findAll();
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
