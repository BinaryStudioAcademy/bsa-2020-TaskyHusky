import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { Projects } from '../entity/Projects';

export class Project1597048908491 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user1 = (await userRepository.getByEmail('test@test.com'))!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user2 = (await userRepository.getByEmail('test1@test.com'))!;

		const project1 = new Projects();
		project1.name = 'Project name';
		project1.key = 'PN';
		project1.category = 'Business';
		project1.leadID = user1.id;
		project1.creatorID = user1.id;
		project1.defaultAssigneeID = user2.id;
		project1.id = '1fbda607-5934-484c-9667-bd35574a2f1e';

		const project2 = new Projects();
		project2.name = 'Our Project';
		project2.key = 'ON';
		project2.category = 'Software';
		project2.leadID = user2.id;
		project2.creatorID = user2.id;
		project2.defaultAssigneeID = user1.id;
		project2.id = 'e040e267-3533-4579-93fa-e749ca93f72f';

		await getRepository('Projects').save([project1, project2]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
