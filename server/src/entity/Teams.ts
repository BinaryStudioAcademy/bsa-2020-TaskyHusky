import { RelationId, Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { UserProfile } from './UserProfile';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToMany(() => UserProfile, (user: UserProfile) => user.teams, { cascade: true })
  @JoinTable()
  users?: UserProfile[];

  @Column()
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @Column('text', { array: true })
  links?: string[];
}
