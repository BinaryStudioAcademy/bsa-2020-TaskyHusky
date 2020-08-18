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
		const project = (await projectRepository.find())[0]!;

		const issueTypeRepository = getCustomRepository(IssueTypeRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueType = (await issueTypeRepository.findAll())[0]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueType2 = (await issueTypeRepository.findAll())[1]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueType3 = (await issueTypeRepository.findAll())[2]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueType4 = (await issueTypeRepository.findAll())[3]!;

		const priorityRepository = getCustomRepository(PriorityRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const priority = (await priorityRepository.findAll())[0]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const priority2 = (await priorityRepository.findAll())[1]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const priority3 = (await priorityRepository.findAll())[2]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const priority4 = (await priorityRepository.findAll())[3]!;

		const issueStatusRepository = getCustomRepository(IssueStatusRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueStatus = (await issueStatusRepository.findAll())[0]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueStatus2 = (await issueStatusRepository.findAll())[1]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueStatus3 = (await issueStatusRepository.findAll())[2]!;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const issueStatus4 = (await issueStatusRepository.findAll())[3]!;

		const issue = new Issue();
		issue.project = project;
		issue.summary = 'Design view';
		issue.description = 'Description about issue';
		issue.creator = user2;
		issue.assigned = user1;
		issue.labels = '{label}';
		issue.attachments = '{attachments}';
		issue.links = '{link/toSpace}';
		issue.issueKey = 'IK-2';
		issue.type = issueType;
		issue.priority = priority;
		issue.status = issueStatus4;

		const issue2 = new Issue();
		issue2.project = project;
		issue2.summary = 'Implement logic';
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

		const issue3 = new Issue();
		issue3.project = project;
		issue3.summary = 'Customized view';
		issue3.description = 'Description about issue3';
		issue3.creator = user2;
		issue3.assigned = user2;
		issue3.labels = '{label}';
		issue3.attachments = '{attachments2}';
		issue3.links = '{link/toSpace}';
		issue3.issueKey = 'IK-3';
		issue3.type = issueType4;
		issue3.priority = priority3;
		issue3.status = issueStatus;

		const issue4 = new Issue();
		issue4.project = project;
		issue4.summary = 'Fixed bugs';
		issue4.description = 'Description about issue4';
		issue4.creator = user1;
		issue4.assigned = user1;
		issue4.labels = '{label}';
		issue4.attachments = '{attachments4}';
		issue4.links = '{link/toSpace}';
		issue4.issueKey = 'IK-3';
		issue4.type = issueType3;
		issue4.priority = priority4;
		issue4.status = issueStatus3;

		const issue5 = new Issue();
		issue5.project = project;
		issue5.summary = 'Fixed eslint warnings';
		issue5.description = 'Description5';
		issue5.creator = user2;
		issue5.assigned = user1;
		issue5.labels = '{label}';
		issue5.attachments = '{attachments4}';
		issue5.links = '{link/toSpace}';
		issue5.issueKey = 'IK-3';
		issue5.type = issueType;
		issue5.priority = priority2;
		issue5.status = issueStatus2;

		await getRepository('Issue').save([issue, issue2, issue3, issue4]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
