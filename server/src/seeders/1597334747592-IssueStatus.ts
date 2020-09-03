import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { IssueStatus } from '../entity/IssueStatus';

export class IssueStatus1597334747592 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const statuses = [
			{
				id: '5059f8ac-476d-4f6b-9d6e-4acf14f772ff',
				title: 'In progress',
				color: 'blue',
			},
			{
				id: '7e3c5f00-e497-4ec3-955f-8d07c11d07b4',
				title: 'Done',
				color: 'green',
			},
			{
				id: 'aae1d28f-ea3a-44da-b130-5bb4870d7c2d',
				title: 'To do',
				color: 'teal',
			},
			{
				id: '5b39e51b-5c9b-40cd-a2f2-302513173099',
				title: 'Help',
				color: 'olive',
			},
			{
				id: '2c83373d-91ee-4cdf-b47f-8aafb45f0772',
				title: 'Stopped',
				color: 'red',
			},
		];

		const repo = getRepository(IssueStatus);
		await repo.save(statuses);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
