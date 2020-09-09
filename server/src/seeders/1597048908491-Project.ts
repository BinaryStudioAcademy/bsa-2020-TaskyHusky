import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { Projects } from '../entity/Projects';
import { ProjectLabel } from '../entity/ProjectLabel';

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
		project1.lead = user1;
		project1.creator = user1;
		project1.defaultAssignee = user2;
		project1.id = '1fbda607-5934-484c-9667-bd35574a2f1e';
		project1.color = '#e9e94e';

		const project2 = new Projects();
		project2.name = 'Our Project';
		project2.key = 'ON';
		project2.category = 'Software';
		project2.lead = user2;
		project2.creator = user2;
		project2.defaultAssignee = user1;
		project2.id = 'e040e267-3533-4579-93fa-e749ca93f72f';
		project2.color = '#7ffa7f';

		const createdProjects = await getRepository('Projects').save([project1, project2]);

		const label1 = new ProjectLabel();
		label1.text = 'Feature';
		label1.textColor = '#fff';
		label1.backgroundColor = '#00f';
		label1.project = project1;

		const label2 = new ProjectLabel();
		label2.text = 'Fix';
		label2.textColor = '#fff';
		label2.backgroundColor = '#f00';
		label2.project = project1;

		const label3 = new ProjectLabel();
		label3.text = 'Story';
		label3.textColor = '#000';
		label3.backgroundColor = '#0f0';
		label3.project = project2;

		project1.labels = [label1, label2];
		project2.labels = [label3];

		await getRepository('ProjectLabel').save([label1, label2, label3]);
		await getRepository('Projects').save(createdProjects);

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
