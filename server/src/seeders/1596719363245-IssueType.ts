import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { IssueType } from '../entity/IssueType';

export class IssueType1596717562603 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const data = [
			{
				title: 'Task',
				color: 'blue',
				icon: 'clipboard check',
			},
			{
				title: 'Bug',
				color: 'red',
				icon: 'dot circle',
			},
			{
				title: 'Story',
				color: 'green',
				icon: 'file alternate',
			},
		];

		const repo = getRepository(IssueType);
		await repo.save(data);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
