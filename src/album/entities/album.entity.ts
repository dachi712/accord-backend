import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Music } from '../../music/entities/music.entity';

@Entity()
export class Album extends BaseEntity {
  @Column()
  title: string;

  @Column()
  releaseYear: number;

  @Column({ nullable: true })
  genre?: string;

  @ManyToOne(() => Artist, artist => artist.albums)
  artists: Artist[];

  @OneToMany(() => Music, music => music.album)
  musics: Music[];
}
