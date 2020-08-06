import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Teams } from './Teams';
import { User } from './User';

@Entity()
export class TeamsPeople {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(type => User, user => user.id)
    userId?: User;

    @ManyToOne(type => Teams, team => team.id)
    teamId?: Teams;
}
