import {
  Column,
  Entity,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ select: false })
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;
}
