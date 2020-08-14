import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class Team1606645895543 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// const exampleData = [
		// 	{
		// 		name: 'Avengers',
		// 		description: 'New team for cool projects',
		// 		links: [
		// 			{
		// 				id: '1fff45fd094',
		// 				http: 'http://localhost:3000',
		// 				name: 'BSA Jira',
		// 				description: 'Our cool project',
		// 			},
		// 		],
		// 	},
		// ];
		// await getRepository('Team').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> { }
}
