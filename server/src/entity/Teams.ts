import { RelationId, Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Teams {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToMany(() => User, (user: User) => user.teams, { cascade: true })
  @JoinTable()
  users?: User[];

  @Column({ unique: true })
  name?: string;

  @Column({ nullable: true })
  description?: string;

  @Column('text', { array: true })
  links?: string[];
}
