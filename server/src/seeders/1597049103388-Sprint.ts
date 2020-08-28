import { getRepository, MigrationInterface, QueryRunner, getCustomRepository } from 'typeorm';

import { Sprint } from '../entity/Sprint';
import { ProjectsRepository } from '../repositories/projects.repository';
import { Projects } from '../entity/Projects';

export class Sprint1597046103388 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const startDate = new Date();
		const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);

		const sprint1 = new Sprint();
		sprint1.id = 'bbe3530c-3fdc-4101-bf73-2967c6d87c17';
		sprint1.sprintName = 'Make us great again';
		sprint1.isActive = false;
		sprint1.isCompleted = false;
		sprint1.project = undefined;
		sprint1.board = undefined;
		sprint1.startDate = startDate;
		sprint1.endDate = endDate;

		const sprint2 = new Sprint();
		sprint2.id = '7dac8783-2421-4683-ae5d-d9adf0c75ecb';
		sprint2.sprintName = 'Innovative Chipmunk Ferret';
		sprint2.isActive = false;
		sprint2.isCompleted = false;
		sprint2.project = undefined;
		sprint2.board = undefined;
		sprint2.startDate = startDate;
		sprint2.endDate = endDate;

		const sprint3 = new Sprint();
		sprint3.id = '5b15a872-0532-499b-9d75-28a874f843e8';
		sprint3.sprintName = 'Panda Grizzly-bear';
		sprint3.isActive = false;
		sprint3.isCompleted = false;
		sprint3.project = undefined;
		sprint3.board = undefined;
		sprint3.startDate = startDate;
		sprint3.endDate = endDate;

		const sprint4 = new Sprint();
		sprint4.id = '936b6909-56ee-40d6-893a-8d5d4c3997fa';
		sprint4.sprintName = 'Calamitous Elk Fawn';
		sprint4.isActive = false;
		sprint4.isCompleted = false;
		sprint4.project = undefined;
		sprint4.board = undefined;
		sprint4.startDate = startDate;
		sprint4.endDate = endDate;

		const sprint5 = new Sprint();
		sprint5.id = '68ce27c8-8972-4b71-b607-7e7e694e4585';
		sprint5.sprintName = 'Brain Hallucinations';
		sprint5.isActive = true;
		sprint5.isCompleted = false;
		sprint5.project = undefined;
		sprint5.board = undefined;
		sprint5.startDate = startDate;
		sprint5.endDate = endDate;

		const sprint6 = new Sprint();
		sprint6.id = 'f3e04dc5-a621-44f4-91ed-56f16af402b7';
		sprint6.sprintName = 'Beautiful Mountains';
		sprint6.isActive = false;
		sprint6.isCompleted = false;
		sprint6.project = undefined;
		sprint6.board = undefined;
		sprint6.startDate = startDate;
		sprint6.endDate = endDate;

		const sprint7 = new Sprint();
		sprint7.id = '936b6909-56ee-40d6-893a-8d5d4c3997fe';
		sprint7.sprintName = 'Drawer For My Dreams';
		sprint7.isActive = false;
		sprint7.isCompleted = false;
		sprint7.project = undefined;
		sprint7.board = undefined;
		sprint7.startDate = startDate;
		sprint7.endDate = endDate;

		await getRepository('Sprint').save([sprint1, sprint2, sprint3, sprint4, sprint5, sprint6, sprint7]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
