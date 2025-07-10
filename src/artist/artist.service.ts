import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistRepository.create(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll()
  }

  async findOne(id: number): Promise<Artist> {
    return this.artistRepository.findOne(id)
  }

  async update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistRepository.update(id, updateArtistDto)
  }

  async softRemove(id: number): Promise<Artist> {
    return this.artistRepository.softRemove(id)
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.artistRepository.remove(id)
  }
}
