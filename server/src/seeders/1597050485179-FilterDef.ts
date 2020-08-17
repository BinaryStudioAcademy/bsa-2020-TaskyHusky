import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class FilterDef1597050485179 implements MigrationInterface {
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
				filterType: 'issueType',
				title: 'Type',
			},
			{
				dataType: 'dropdown',
				filterType: 'assigned',
				title: 'Assignee',
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
			{
				dataType: 'searchText',
				filterType: 'comment',
				title: 'Comment',
			},
			{
				dataType: 'searchText',
				filterType: 'summary',
				title: 'Summary',
			},
		];
		await getRepository('FilterDefinition').save(filterDefs);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
