import { getRepository, MigrationInterface, QueryRunner, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';

export class Team1606645895543 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user = (await userRepository.getByEmail('test@test.com'))!;

		const exampleData = [
			{
				name: 'Avengers',
				description: 'New team for cool projects',
				links: [
					{
						id: '1fff45fd094',
						http: 'http://localhost:3000',
						name: 'BSA Jira',
						description: 'Our cool project',
					},
				],
				createdBy:user,
				color:'red',

			},
		];
		await getRepository('Team').save(exampleData);
	}

	public async down(queryRunner: QueryRunner): Promise<void> { }
}
