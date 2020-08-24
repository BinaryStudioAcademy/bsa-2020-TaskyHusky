import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { IsString, IsBoolean, IsNotEmpty, IsDate } from 'class-validator';
import { UserProfile } from './UserProfile';

@Entity()
export class Notification {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: true })
	@IsString()
	title?: string;

	@Column({ nullable: true })
	@IsString()
	link?: string;

	@Column()
	@IsString()
	@IsNotEmpty()
	text!: string;

	@Column({ default: false })
	@IsBoolean()
	isViewed!: boolean;

	@OneToMany((type) => UserProfile, (user) => user.notifications)
	@IsNotEmpty()
	user!: UserProfile;

	@CreateDateColumn()
	@IsDate()
	createdAt!: Date;
}
