import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Priority } from '../entity/Priority';

export class Priority1596718071573 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const data = [
			{
				color: 'green',
				icon: 'angle double down',
				title: 'Lowest',
			},
			{
				color: 'teal',
				icon: 'chevron down',
				title: 'Low',
			},
			{
				color: 'blue',
				icon: 'minus',
				title: 'Medium',
			},
			{
				color: 'orange',
				icon: 'chevron up',
				title: 'High',
			},
			{
				color: 'red',
				icon: 'angle double up',
				title: 'Highest',
			},
		];

		const repo = getRepository(Priority);
		await repo.save(data);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
