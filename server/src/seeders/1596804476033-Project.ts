import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class Project1596804476033 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const filterDefs = [
			{
				name: 'Project name',
				key: 'pr-key',
				projectType: 'Project type',
				category: 'Project category',
				defaultAssigneeID: 'defaultAssigneeID',
				leadID: '11217be4-4529-4cfc-a021-f38c5a22e8a6',
				creatorID: '11217be4-4529-4cfc-a021-f38c5a22e8a6',
			},
			{
				name: 'New Project name',
				key: 'pr-key2',
				projectType: 'Project type2',
				category: 'Project category2',
				defaultAssigneeID: 'assigneeID',
				leadID: '11217be4-4529-4cfc-a021-f38c5a22e8a6',
				creatorID: '11217be4-4529-4cfc-a021-f38c5a22e8a6',
			},
		];
		await getRepository('Projects').save(filterDefs);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
