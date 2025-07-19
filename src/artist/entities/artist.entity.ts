import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Album } from 'src/album/entities/album.entity';
import { Music } from 'src/music/entities/music.entity';

@Entity()
export class Artist extends BaseEntity {
  @Column()
  name: string;

  @Column()
  genre: string;

  @OneToMany(() => Album, album => album.artists)
  albums: Album[];

  @OneToMany(() => Music, music => music.artists)
  musics: Music[];
}
