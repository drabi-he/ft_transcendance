import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ranks')
export class Rank {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  requiredPoints: number;

  @Column()
  upgradePoints: number;

  @Column()
  emblem: string;

  @Column()
  border: string;
}
