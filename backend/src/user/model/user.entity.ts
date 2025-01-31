import { Rank } from 'src/rank/models/rank.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  campus: string;

  @Column()
  cursus_lvl: string;

  @Column({ default: 0 })
  game_lvl: number;

  @Column({ default: 'http://localhost:3001/api/uploads/default.jpeg' })
  avatar: string;

  @Column({ default: 0 })
  points: number;

  @ManyToOne(() => Rank)
  @JoinColumn({ name: 'rank_id' })
  rank: Rank;
}
