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
		project1.lead = user1.id;
		project1.creator = user1.id;
		project1.defaultAssignee = user2.id;
		project1.id = '1fbda607-5934-484c-9667-bd35574a2f1e';

		const project2 = new Projects();
		project2.name = 'Our Project';
		project2.key = 'ON';
		project2.category = 'Software';
		project2.lead = user2.id;
		project2.creator = user2.id;
		project2.defaultAssignee = user1.id;
		project2.id = 'e040e267-3533-4579-93fa-e749ca93f72f';
		await getRepository('Projects').save([project1, project2]);

		await getRepository('Sprint').save([
			{
				id: '68ce27c8-8972-4b71-b607-7e7e694e4585',
				sprintName: 'Brain Hallucinations',
				isActive: true,
				isCompleted: false,
				project: '1fbda607-5934-484c-9667-bd35574a2f1e',
				board: 'cd947d22-8efd-4b2f-8b6a-446dc542c8df',
			},
			{
				id: 'f3e04dc5-a621-44f4-91ed-56f16af402b7',
				sprintName: 'Beautiful Mountains',
				isActive: false,
				isCompleted: false,
				project: '1fbda607-5934-484c-9667-bd35574a2f1e',
				board: 'cd947d22-8efd-4b2f-8b6a-446dc542c8df',
			},
			{
				id: '936b6909-56ee-40d6-893a-8d5d4c3997fe',
				sprintName: 'Drawer For My Dreams',
				isActive: false,
				isCompleted: false,
				project: '1fbda607-5934-484c-9667-bd35574a2f1e',
				board: 'cd947d22-8efd-4b2f-8b6a-446dc542c8df',
			},
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
