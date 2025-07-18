import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Album } from 'src/album/entities/album.entity';
import { Music } from 'src/music/entities/music.entity';

@Entity()
export class Artist extends BaseEntity {
  @Column()
  name: string;

  @Column()
  genre: string;

  @ManyToMany(() => Album, (album) => album.artists)
  albums: Album[];

  @ManyToMany(() => Music, (music) => music.artists)
  musics: Music[];

  @Column()
  isActive: boolean;
}
