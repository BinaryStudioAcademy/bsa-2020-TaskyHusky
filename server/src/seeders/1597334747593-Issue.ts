import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { ProjectsRepository } from '../repositories/projects.repository';
import { IssueTypeRepository } from '../repositories/issueType.repository';
import { Issue } from '../entity/Issue';

export class Issue1597334747593 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user1 = (await userRepository.getByEmail('test@test.com'))!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user2 = (await userRepository.getByEmail('test1@test.com'))!;

		const projectRepository = getCustomRepository(ProjectsRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const project = (await projectRepository.findAll())[0]!;

		const issueTypeRepository = getCustomRepository(IssueTypeRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueType = (await issueTypeRepository.findAll())[0]!;

		const issue = new Issue();
		issue.type = issueType;
		issue.project = project;
		issue.summary = 'Summary about issue';
		issue.description = 'Description about issue';
		issue.creator = user1;
		issue.assigned = user2;
		issue.labels = '{label}';
		issue.attachments = '{attach}';
		issue.links = '{link}';
		issue.issueKey = '{key}';
		await getRepository('Issue').save(issue);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
