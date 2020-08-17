import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { UsersSeed } from '../seeds/users.seed';
import { TeamsSeed } from '../seeds/teams.seed';

export class Teams1597155507178 implements MigrationInterface {
	public async up(_: QueryRunner): Promise<any> {
		const users = await getRepository('UserProfile').save(UsersSeed);
		const teams: any = TeamsSeed;
		teams.users = users;
		await getRepository('Team').save(teams);
	}

	public async down(_: QueryRunner): Promise<any> {
		// do nothing
	}
}
