import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IssueType } from './IssueType';
import { Priority } from './Priority';

@Entity()
export class Issue {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(type => IssueType)
    type?: IssueType;

    @Column()
    summary?: string;

    @Column() // Replace with rel.
    boardColumnID?: string;

    @Column({ array: true })
    labels?: string;

    @Column({ array: true })
    attachments?: string;

    @Column({ array: true })
    links?: string;

    @ManyToOne(type => Priority)
    priority?: Priority;

    @Column()
    description?: string;

    @Column() // Replace with rel.
    sprintID?: string;

    @Column() // Replace with rel.
    projectID?: string;

    @Column()
    issueKey?: string;

    @Column() // Replace with rel.
    assignedID?: string;

    @Column() // Replace with rel.
    creatorID?: string;
}
