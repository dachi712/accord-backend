import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) { }

  async create(data: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistRepository.create(data);
    return this.artistRepository.save(newArtist);
  }

  async update(id: number, data: UpdateArtistDto): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('Artist Not Found');
    }

    Object.assign(artist, data);

    return this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    const artist = await this.artistRepository.find();
    if (artist.length === 0) {
      throw new NotFoundException('No Artists Registered In Database');
    }

    return artist;
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist Not Found');

    return artist;
  }

  async find(options?: FindManyOptions<Artist>): Promise<Artist[]> {
    return this.artistRepository.find(options)
  }

  async softRemove(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist Not Found');

    return this.artistRepository.softRemove(artist);
  }

  async remove(id: number): Promise<DeleteResult> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException('Artist Not Found');

    return this.artistRepository.delete(id);
  }
}