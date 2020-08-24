import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsString, IsBoolean, IsNotEmpty, IsDate } from 'class-validator';
import { UserProfile } from './UserProfile';
import { CreateNotification } from '../repositories/notification.repository';

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

	@ManyToOne((type) => UserProfile, (user) => user.notifications)
	@IsNotEmpty()
	user!: UserProfile;

	@Column()
	@IsDate()
	createdAt!: Date;
}
