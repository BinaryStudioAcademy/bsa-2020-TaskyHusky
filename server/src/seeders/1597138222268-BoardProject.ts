import { MigrationInterface, QueryRunner, getRepository, getCustomRepository } from 'typeorm';
import { BoardRepository } from '../repositories/board.repository';
import { BoardType } from '../models/Board';
import { Projects } from '../entity/Projects';

export class BoardProject1597138222268 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const customBoardRepository = getCustomRepository(BoardRepository);
		const boardRepository = getRepository('Board');
		const projectRepository = getRepository('Projects');

		const project1 = <Projects>await projectRepository.findOne({
			where: {
				id: '1fbda607-5934-484c-9667-bd35574a2f1e',
			},
		});

		const project2 = <Projects>await projectRepository.findOne({
			where: {
				id: 'e040e267-3533-4579-93fa-e749ca93f72f',
			},
		});

		const board1 = await customBoardRepository.findByType(BoardType.Kanban);

		board1.projects = [project1, project2];
		boardRepository.save(board1);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
