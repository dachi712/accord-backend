import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Music extends BaseEntity {
  @Column()
  title: string;

  @ManyToOne(() => Artist, artist => artist.musics, { eager: true })

  artist: Artist;

  @ManyToOne(() => Album, album => album.musics, { eager: true })
  album: Album;

  @Column({ nullable: true })
  releaseYear?: number;

  @Column({ nullable: true })
  genre?: string;
}
