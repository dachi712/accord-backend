import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Album extends BaseEntity {
  @Column()
  title: string;

  @Column()
  artist: string

  @Column()
  releaseYear: number;

  @Column({ nullable: true })
  genre?: string;
}
