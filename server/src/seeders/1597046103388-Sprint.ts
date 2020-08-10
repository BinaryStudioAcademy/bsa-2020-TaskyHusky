import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class Sprint1597046103388 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const data = [
			{
				sprintName: 'Innovative Chipmunk Ferret',
				isActive: false,
				isCompleted: true,
			},
			{
				sprintName: 'Panda Grizzly-bear',
				isActive: true,
				isCompleted: false,
			},
			{
				sprintName: 'Calamitous Elk Fawn',
				isActive: false,
				isCompleted: false,
			},
		];
		await getRepository('Sprint').save(data);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
