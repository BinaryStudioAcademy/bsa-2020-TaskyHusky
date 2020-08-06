import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Priority } from '../entity/Priority';

export class Priority1596718071573 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const data = [
			{
				color: 'green',
				icon: 'window close outline',
				title: 'Lowest',
			},
			{
				color: 'teal',
				icon: 'battery low',
				title: 'Low',
			},
			{
				color: 'blue',
				icon: 'medium m',
				title: 'Medium',
			},
			{
				color: 'orange',
				icon: 'check',
				title: 'High',
			},
			{
				color: 'red',
				icon: 'check circle',
				title: 'Highest',
			},
		];

		const repo = getRepository(Priority);
		await repo.save(data);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
