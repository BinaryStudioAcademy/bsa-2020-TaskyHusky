import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Issue } from './Issue';
import { UserProfile } from './UserProfile';

@Entity()
export class IssueComment {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	text!: string;

	@Column()
	createdAt!: Date;

	@Column()
	editedAt?: Date;

	@ManyToOne((type) => Issue)
	issue!: Issue;

	@ManyToOne((type) => UserProfile)
	creator!: UserProfile;
}
