import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TeamsPeople } from './TeamsPeople';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(type => TeamsPeople, teams => teams.teamId)
  teamId?: TeamsPeople[];

  @Column()
  description?: string;

  @Column('text', { array: true })
  links?: string[];

}
