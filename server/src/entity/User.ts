import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, IsEmail } from 'class-validator';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	@Column({ nullable: true })
	avatar?: string;

	@Column({ nullable: true })
	department?: string;

	@Column({ nullable: true })
	timezone?: string;

	@Column({ nullable: true })
	organization?: string;

	@Column({ unique: true })
	email?: string;

	@Column({ nullable: true })
	@IsEmail()
	jobTitle?: string;

	@Column({ nullable: true })
	userSettingsId?: string;

	@Column()
	@MinLength(6)
	password?: string;
}
