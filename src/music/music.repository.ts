import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  Repository,
} from 'typeorm';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>
  ) {}

  async create(data: DeepPartial<Music>): Promise<Music> {
    const newMusic = this.musicRepository.create(data);
    return this.musicRepository.save(newMusic);
  }

  async update(id: number, data: UpdateMusicDto): Promise<Music> {
    const music = await this.musicRepository.findOneBy({ id });
    if (!music) throw new NotFoundException('Music Not Found');

    Object.assign(music, data);

    return this.musicRepository.save(music);
  }

  async findAll(): Promise<Music[]> {
    const results = await this.musicRepository.find();
    if (results.length === 0) {
      throw new NotFoundException('No Music Is Registered In Database');
    }

    return results;
  }

  async find(options?: FindManyOptions<Music>): Promise<Music[]> {
    return this.musicRepository.find(options);
  }

  async findOne(id: number): Promise<Music> {
    const music = await this.musicRepository.findOne({ where: { id } });
    if (!music) throw new NotFoundException('Music Not Found');

    return music;
  }

  async save(music: Music): Promise<Music> {
    return await this.musicRepository.save(music);
  }

  async softRemove(id: number): Promise<Music> {
    const music = await this.musicRepository.findOne({ where: { id } });
    if (!music) throw new NotFoundException('Music Not Found');

    return this.musicRepository.softRemove(music);
  }

  async remove(id: number): Promise<DeleteResult> {
    const music = await this.musicRepository.findOne({ where: { id } });
    if (!music) throw new NotFoundException('Music Not Found');

    return this.musicRepository.delete(id);
  }
}
