<<<<<<< Updated upstream
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinTable } from 'typeorm';
import { UserProfile } from './UserProfile';
import { Sprint } from './Sprint';
import { Board } from './Board';
=======
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Sprint } from './Sprint';
import { Board } from './Board';
import { UserProfile } from './UserProfile';
>>>>>>> Stashed changes

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
	defaultAssigneeId?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.leadedProjects)
	leadId?: UserProfile;

	@ManyToOne((type) => UserProfile, (userProfile) => userProfile.createdProjects)
	creatorId!: UserProfile;

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
