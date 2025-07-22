import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from './entities/music.entity';
import { DeleteResult } from 'typeorm';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  create(@Body() createMusicDto: CreateMusicDto): Promise<Music> {
    return this.musicService.create(createMusicDto);
  }

  @Get()
  findAll(): Promise<Music[]> {
    return this.musicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Music> {
    return this.musicService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto
  ): Promise<Music> {
    return this.musicService.update(+id, updateMusicDto);
  }

  @Delete('soft/:id')
  softRemove(@Param('id', ParseIntPipe) id: number): Promise<Music> {
    return this.musicService.softRemove(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.musicService.remove(+id);
  }
}
