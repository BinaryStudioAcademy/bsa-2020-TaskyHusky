import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { IssueStatusRepository } from '../repositories/issueStatus.repository';
import { PriorityRepository } from '../repositories/priority.repository';
import { UserRepository } from '../repositories/user.repository';
import { ProjectsRepository } from '../repositories/projects.repository';
import { IssueTypeRepository } from '../repositories/issueType.repository';
import { Issue } from '../entity/Issue';
import { SprintRepository } from '../repositories/sprint.repository';
import { BoardRepository } from '../repositories/board.repository';

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

		const sprintRepository = getCustomRepository(SprintRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const sprint1 = await sprintRepository.findOneById('68ce27c8-8972-4b71-b607-7e7e694e4585');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const sprint2 = await sprintRepository.findOneById('f3e04dc5-a621-44f4-91ed-56f16af402b7');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const sprint3 = await sprintRepository.findOneById('936b6909-56ee-40d6-893a-8d5d4c3997fe');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const sprint4 = await sprintRepository.findOneById('bbe3530c-3fdc-4101-bf73-2967c6d87c17');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const sprint5 = await sprintRepository.findOneById('7dac8783-2421-4683-ae5d-d9adf0c75ecb');

		const boardRepository = getCustomRepository(BoardRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const scrumBoard = await boardRepository.findOne('cd947d22-8efd-4b2f-8b6a-446dc542c8df');

		const issue1 = new Issue();
		issue1.id = '3219cbaf-b76e-44f1-bcad-837f08dd2c2b';
		issue1.createdAt = new Date('2020-05-15');
		issue1.updatedAt = new Date('2020-05-18');
		issue1.project = project;
		issue1.board = scrumBoard;
		issue1.summary = 'Design view';
		issue1.description = 'Places new and ladies, too, I’m B.J. McKay and this is my best friend Bear. ';
		issue1.creator = user2;
		issue1.assigned = user1;
		issue1.labels = '{label}';
		issue1.attachments = '{attachments}';
		issue1.links = '{link/toSpace}';
		issue1.issueKey = 'IK-1';
		issue1.type = issueType;
		issue1.priority = priority4;
		issue1.status = issueStatus4;

		const issue2 = new Issue();
		issue2.id = '48bd9760-a40c-4c99-b878-5b33b3d33213';
		issue2.project = project;
		issue2.createdAt = new Date('2020-03-12');
		issue2.updatedAt = new Date('2020-05-15');
		issue2.summary = 'Implement logic';
		issue2.description =
			'New dreams and better scenes, and best of all I don’t pay property tax. Rollin’ down to Dallas, who’s providin’ my palace, off to New Orleans or who knows where.';
		issue2.creator = user1;
		issue2.assigned = user2;
		issue2.labels = '{label}';
		issue2.attachments = '{attachments2}';
		issue2.links = '{link/toSpace}';
		issue2.issueKey = 'IK-2';
		issue2.type = issueType2;
		issue2.priority = priority;
		issue2.status = issueStatus2;
		issue2.sprint = sprint5;

		const issue3 = new Issue();
		issue3.id = 'b3d78536-db29-4498-8cf1-78a4f6173d65';
		issue3.project = project;
		issue3.createdAt = new Date('2020-01-22');
		issue3.updatedAt = new Date('2020-04-03');
		issue3.summary = 'Customized view';
		issue3.description =
			'He’s goin’ everywhere, B.J. McKay and his best friend Bear. He just keeps on movin’, ladies keep improvin’, every day is better than the last.';
		issue3.creator = user2;
		issue3.assigned = user2;
		issue3.labels = '{label}';
		issue3.attachments = '{attachments2}';
		issue3.links = '{link/toSpace}';
		issue3.issueKey = 'IK-3';
		issue3.type = issueType4;
		issue3.priority = priority2;
		issue3.status = issueStatus;
		issue3.sprint = sprint4;

		const issue4 = new Issue();
		issue4.id = '469a02fc-0377-4c31-9bd1-c307b7da38b2';
		issue4.project = project;
		issue1.board = scrumBoard;
		issue4.createdAt = new Date('2020-04-02');
		issue4.updatedAt = new Date('2020-09-22');
		issue4.summary = 'Fixed bugs';
		issue4.description =
			'Hey there where ya goin’, not exactly knowin’, who says you have to call just one place home. ';
		issue4.creator = user1;
		issue4.assigned = user1;
		issue4.labels = '{label}';
		issue4.attachments = '{attachments4}';
		issue4.links = '{link/toSpace}';
		issue4.issueKey = 'IK-4';
		issue4.type = issueType3;
		issue4.priority = priority3;
		issue4.status = issueStatus3;
		issue4.sprint = sprint1;

		const issue5 = new Issue();
		issue5.id = '2de14a5e-5407-40e3-b6dd-f412f4409b1f';
		issue5.project = project;
		issue1.board = scrumBoard;
		issue5.createdAt = new Date('2020-01-01');
		issue5.updatedAt = new Date('2020-01-02');
		issue5.summary = 'Add relations to entities';
		issue5.description =
			'So, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon, stop that pigeon. Howwww! Nab him, jab him, tab him, grab him, stop that pigeon now.';
		issue5.creator = user2;
		issue5.assigned = user1;
		issue5.labels = '{label}';
		issue5.attachments = '{attachments4}';
		issue5.links = '{link/toSpace}';
		issue5.issueKey = 'IK-5';
		issue5.type = issueType4;
		issue5.priority = priority4;
		issue5.status = issueStatus4;
		issue5.sprint = sprint2;

		const issue6 = new Issue();
		issue6.id = 'c6cad0eb-5e90-4fba-9c3f-de1fc6b355a2';
		issue6.project = project;
		issue1.board = scrumBoard;
		issue6.createdAt = new Date('2020-02-23');
		issue6.updatedAt = new Date('2020-03-23');
		issue6.summary = 'Invest money in Bitcoin';
		issue6.description =
			'Those medals you wear on your moth-eaten chest should be there for bungling at which you are best.';
		issue6.creator = user2;
		issue6.assigned = user1;
		issue6.labels = '{label}';
		issue6.attachments = '{attachments4}';
		issue6.links = '{link/toSpace}';
		issue6.issueKey = 'IK-6';
		issue6.type = issueType;
		issue6.priority = priority;
		issue6.status = issueStatus2;
		issue6.sprint = sprint3;

		const issue7 = new Issue();
		issue7.id = '44b274eb-301b-4192-a6b6-9f55a67b6cfe';
		issue7.project = project;
		issue1.board = scrumBoard;
		issue7.createdAt = new Date('2020-02-12');
		issue7.updatedAt = new Date('2020-03-12');
		issue7.summary = 'Think of back-end implementation';
		issue7.description = 'Mutley, you snickering, floppy eared hound. When courage is needed, you’re never around.';
		issue7.creator = user2;
		issue7.assigned = user2;
		issue7.labels = '{label}';
		issue7.attachments = '{attachments4}';
		issue7.links = '{link/toSpace}';
		issue7.issueKey = 'IK-7';
		issue7.type = issueType2;
		issue7.priority = priority2;
		issue7.status = issueStatus3;
		issue7.sprint = sprint1;

		const issue8 = new Issue();
		issue8.id = '53eb4b1b-8706-4edb-9d6a-beb5c15a66f2';
		issue8.project = project;
		issue1.board = scrumBoard;
		issue8.createdAt = new Date('2020-02-25');
		issue8.updatedAt = new Date('2020-06-19');
		issue8.summary = 'Fix styling of header menu';
		issue8.description =
			'Can’t stay for long, just turn around and I’m gone again. Maybe tomorrow, I’ll want to settle down, Until tomorrow, I’ll just keep moving on.';
		issue8.creator = user1;
		issue8.assigned = user2;
		issue8.labels = '{label}';
		issue8.attachments = '{attachments4}';
		issue8.links = '{link/toSpace}';
		issue8.issueKey = 'IK-8';
		issue8.type = issueType3;
		issue8.priority = priority3;
		issue8.status = issueStatus;
		issue8.sprint = sprint2;

		const issue9 = new Issue();
		issue9.id = '54f7498e-84af-468e-a5ca-0023aa4c283b';
		issue9.project = project;
		issue1.board = scrumBoard;
		issue9.createdAt = new Date('2020-02-21');
		issue9.updatedAt = new Date('2020-012-12');
		issue9.summary = 'Create seeders';
		issue9.description =
			'There’s a voice that keeps on calling me. Down the road, that’s where I’ll always be. Every stop I make, I make a new friend.';
		issue9.creator = user1;
		issue9.assigned = user1;
		issue9.labels = '{label}';
		issue9.attachments = '{attachments4}';
		issue9.links = '{link/toSpace}';
		issue9.issueKey = 'IK-9';
		issue9.type = issueType4;
		issue9.priority = priority4;
		issue9.status = issueStatus4;
		issue9.sprint = sprint3;

		await getRepository('Issue').save([issue1, issue2, issue3, issue4, issue5, issue6, issue7, issue8, issue9]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
