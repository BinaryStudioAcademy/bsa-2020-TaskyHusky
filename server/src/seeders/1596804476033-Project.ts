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
				leadID: 'leadID',
				creatorID: 'creatorID',
			},
			{
				name: 'New Project name',
				key: 'pr-key2',
				projectType: 'Project type2',
				category: 'Project category2',
				defaultAssigneeID: 'assigneeID',
				leadID: 'leadID',
				creatorID: 'creatorID',
			},
		];
		await getRepository('Projects').save(filterDefs);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
