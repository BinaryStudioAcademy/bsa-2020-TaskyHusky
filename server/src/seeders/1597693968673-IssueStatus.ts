import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { IssueStatus } from '../entity/IssueStatus';

export class IssueStatus1597693968673 implements MigrationInterface {
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
		];

		const repo = getRepository(IssueStatus);
		await repo.save(statuses);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
