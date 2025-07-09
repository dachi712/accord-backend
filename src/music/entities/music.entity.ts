import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Music extends BaseEntity {
  @Column()
  title: string;

  @Column()
  artist: string;

  @Column({ nullable: true })
  releaseYear?: number;

  @Column({ nullable: true })
  genre?: string;
}
