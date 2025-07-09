import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { Album } from './entities/album.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumRepository.create(createAlbumDto);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  async findOne(id: number): Promise<Album> {
    return this.albumRepository.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.albumRepository.remove(id);
  }
}
