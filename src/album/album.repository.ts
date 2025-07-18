import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>
  ) { }

  async create(data: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumRepository.create(data);
    return this.albumRepository.save(newAlbum);
  }

  async update(id: number, data: UpdateAlbumDto): Promise<Album> {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) throw new NotFoundException('Album Not Found');

    Object.assign(album, data)

    return this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    const album = await this.albumRepository.find();
    if (album.length === 0) {
      throw new NotFoundException('Album Not Found');
    }

    return album;
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album Not Found');

    return album;
  }

  async find(options?: FindManyOptions<Album>): Promise<Album[]> {
    return this.albumRepository.find(options)
  }

  async softRemove(id: number): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album Not Found');

    return this.albumRepository.softRemove(album);
  }

  async remove(id: number): Promise<DeleteResult> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException('Album Not Found');

    return this.albumRepository.delete(id);
  }
}
