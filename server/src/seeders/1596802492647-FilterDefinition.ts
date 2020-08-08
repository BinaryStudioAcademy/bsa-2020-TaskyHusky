import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class FilterDefinition1596802492647 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const filterDefs = [
			{
				dataType: 'dropdown',
				filterType: 'projects',
				title: 'Projects',
			},
			{
				dataType: 'dropdown',
				filterType: 'issueStatus',
				title: 'Status',
			},
			{
				dataType: 'dropdown',
				filterType: 'issueTypes',
				title: 'Type',
			},
			{
				dataType: 'dropdown',
				filterType: 'creator',
				title: 'Creator',
			},
			{
				dataType: 'dropdown',
				filterType: 'priority',
				title: 'Priority',
			},
			{
				dataType: 'searchText',
				filterType: 'description',
				title: 'Description',
			},
		];
		await getRepository('FilterDefinition').save(filterDefs);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
