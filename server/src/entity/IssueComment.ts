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

	@Column({ nullable: true })
	editedAt?: Date;

	@ManyToOne((type) => Issue, { onDelete: 'CASCADE' })
	issue!: Issue;

	@ManyToOne((type) => UserProfile, { onDelete: 'CASCADE' })
	creator!: UserProfile;
}
