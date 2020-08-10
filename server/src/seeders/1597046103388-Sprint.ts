import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class Sprint1597046103388 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const data = [
			{
				id: '7dac8783-2421-4683-ae5d-d9adf0c75ecb',
				sprintName: 'Innovative Chipmunk Ferret',
				isActive: false,
				isCompleted: true,
			},
			{
				id: '5b15a872-0532-499b-9d75-28a874f843e8',
				sprintName: 'Panda Grizzly-bear',
				isActive: true,
				isCompleted: false,
			},
			{
				id: '936b6909-56ee-40d6-893a-8d5d4c3997fe',
				sprintName: 'Calamitous Elk Fawn',
				isActive: false,
				isCompleted: false,
			},
		];
		await getRepository('Sprint').save(data);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
