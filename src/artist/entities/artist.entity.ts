import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Album } from '../../album/entities/album.entity';
import { Music } from '../../music/entities/music.entity';

@Entity()
export class Artist extends BaseEntity {
  @Column()
  name: string;

  @Column()
  genre: string;

  @OneToMany(() => Album, album => album.artists)
  albums: Album[];

  @OneToMany(() => Music, music => music.artist)
  musics: Music[];
}
