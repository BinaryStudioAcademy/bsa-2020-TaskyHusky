import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { IssueStatusRepository } from '../repositories/issueStatus.repository';
import { PriorityRepository } from '../repositories/priority.repository';
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
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueType2 = (await issueTypeRepository.findAll())[1]!;

		const priorityRepository = getCustomRepository(PriorityRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const priority = (await priorityRepository.findAll())[0]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const priority2 = (await priorityRepository.findAll())[1]!;

		const issueStatusRepository = getCustomRepository(IssueStatusRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueStatus = (await issueStatusRepository.findAll())[0]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueStatus2 = (await issueStatusRepository.findAll())[1]!;

		const issue = new Issue();
		issue.project = project;
		issue.summary = 'Summary about issue';
		issue.description = 'Description about issue';
		issue.creator = user1;
		issue.assigned = user2;
		issue.labels = '{label}';
		issue.attachments = '{attachments}';
		issue.links = '{link/toSpace}';
		issue.issueKey = 'IK-2';
		issue.type = issueType;
		issue.priority = priority;
		issue.status = issueStatus;

		const issue2 = new Issue();
		issue2.project = project;
		issue2.summary = 'Summary about issue2';
		issue2.description = 'Description about issue2';
		issue2.creator = user1;
		issue2.assigned = user2;
		issue2.labels = '{label}';
		issue2.attachments = '{attachments2}';
		issue2.links = '{link/toSpace}';
		issue2.issueKey = 'IK-2';
		issue2.type = issueType2;
		issue2.priority = priority2;
		issue2.status = issueStatus2;

		await getRepository('Issue').save([issue, issue2]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
