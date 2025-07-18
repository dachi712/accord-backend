import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Music } from 'src/music/entities/music.entity';

@Entity()
export class Album extends BaseEntity {
  @Column()
  title: string;

  @Column()
  releaseYear: number;

  @Column({ nullable: true })
  genre?: string;

  @ManyToMany(() => Artist, (artist) => artist.albums)
  @JoinTable()
  artists: Artist[];

  @OneToMany(() => Music, (music) => music.album)
  musics: Music[];
}
