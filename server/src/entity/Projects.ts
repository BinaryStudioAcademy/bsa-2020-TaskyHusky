import { Board } from './Board';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserProfile } from './UserProfile';

@Entity()
export class Projects {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	name!: string;

	@Column()
	key!: string;

	@Column({ type: 'text', nullable: true })
	category?: string;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.assignedProjects)
	defaultAssignee?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.leadedProjects)
	lead?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.createdProjects)
	creator!: UserProfile;

	@ManyToMany((type) => UserProfile)
	@JoinTable({
		name: 'ProjectsPeople',
	})
	users?: UserProfile[];

	@ManyToMany((type) => Board)
	@JoinTable({
		name: 'ProjectBoards',
	})
	boards?: Board[];
}
