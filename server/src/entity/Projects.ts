import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { UserProfile } from './UserProfile';
import { Sprint } from './Sprint';
import { Board } from './Board';

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

	@OneToMany((type) => Sprint, (sprint) => sprint.id)
	sprints?: Sprint[];

	@ManyToMany((type) => Board, (board) => board.projects)
	boards?: Board[];
}
