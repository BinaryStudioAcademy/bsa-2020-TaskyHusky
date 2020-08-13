import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserProfile } from './UserProfile';
@Entity()
export class Filter {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@ManyToOne((type) => UserProfile, (user) => user.filters, {
		onDelete: 'CASCADE',
	})
	owner?: UserProfile;

	@Column({ nullable: false })
	ownerId?: string;

	@Column()
	name?: string;

	@ManyToMany((type) => UserProfile)
	@JoinTable()
	staredBy?: UserProfile[];
}
