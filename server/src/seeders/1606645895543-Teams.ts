import { getRepository, getCustomRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { Team } from '../entity/Team';

export class Team1606645895543 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user2 = (await userRepository.getByEmail('test1@test.com'))!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user1 = (await userRepository.getByEmail('test@test.com'))!;
		/* 	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const teamOwner = (await userRepository.getByEmail('jobs_my@gmail.com'))!
	 */
		const team = new Team();

		team.name = 'Avengers';
		team.description = 'New team for cool projects';
		team.links = [
			JSON.stringify({
				id: '1fff45fd094',
				http: 'http://localhost:3000',
				name: 'BSA Jira',
				description: 'Our cool project',
			}),
		];
		team.users = [user2, user1];
		team.createdBy = user1;

		await getRepository('Team').save(team);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
