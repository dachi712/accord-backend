import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';

@Entity()
export class Music extends BaseEntity {
  @Column()
  title: string;

  @ManyToMany(() => Artist, (artist) => artist.musics)
  @JoinTable()
  artists: Artist[];

  @ManyToOne(() => Album, (album) => album.musics, { eager: true })
  album: Album;

  @Column({ nullable: true })
  releaseYear?: number;

  @Column({ nullable: true })
  genre?: string;
}
