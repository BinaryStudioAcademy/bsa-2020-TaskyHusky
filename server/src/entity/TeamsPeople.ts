import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Teams } from './Teams';
import { UserProfile } from './UserProfile';

@Entity()
export class TeamsPeople {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => UserProfile, (user) => user.id)
	userId?: UserProfile;

	@ManyToOne((type) => Teams, (team) => team.id)
	teamId?: Teams;
}
