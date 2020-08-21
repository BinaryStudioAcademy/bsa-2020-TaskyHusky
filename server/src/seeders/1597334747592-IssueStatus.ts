import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { IssueStatus } from '../entity/IssueStatus';

export class IssueStatus1597334747592 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const statuses = [
			{
				title: 'In progress',
				color: 'blue',
			},
			{
				title: 'Done',
				color: 'green',
			},
			{
				title: 'To do',
				color: 'teal',
			},
			{
				title: 'Help',
				color: 'yellow',
			},
			{
				title: 'Stopped',
				color: 'red',
			},
		];

		const repo = getRepository(IssueStatus);
		await repo.save(statuses);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
