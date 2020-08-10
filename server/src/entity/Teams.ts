import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToMany(() => User, (user: User) => user.teams)
  @JoinTable()
  users!: User[];

  @Column()
  name?: string;

  @Column()
  description?: string;

  @Column('text', { array: true })
  links?: string[];
}
