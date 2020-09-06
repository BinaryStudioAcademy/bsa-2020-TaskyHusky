import { getCustomRepository, getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { BoardRepository } from '../repositories/board.repository';
import { BoardColumn } from '../entity/BoardColumn';
import { Board } from '../entity/Board';
import { BoardType } from '../models/Board';
import { UserRepository } from '../repositories/user.repository';
import { BoardColumnRepository } from '../repositories/boardColumn.repository';

export class Board1596645901833 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user1 = (await userRepository.getByEmail('test@test.com'))!;
		const board1 = new Board();
		board1.id = '37614b5a-4682-43ab-96b2-0daa14548135';
		board1.boardType = BoardType.Kanban;
		board1.createdBy = user1;
		board1.name = 'Table1';

		const board2 = new Board();
		board2.id = 'cd947d22-8efd-4b2f-8b6a-446dc542c8df';
		board2.boardType = BoardType.Scrum;
		board2.createdBy = user1;
		board2.name = 'Table2';

		await getRepository('Board').save([board1, board2]);

		const boardRepository = getCustomRepository(BoardRepository);
		const columnRepository = getCustomRepository(BoardColumnRepository);

		const board = await boardRepository.findByType(BoardType.Kanban);

		const column1 = new BoardColumn();
		column1.board = board;
		column1.columnName = 'backlog';
		column1.isResolutionSet = false;
		column1.status = 'backlog';

		const column2 = new BoardColumn();
		column2.board = board;
		column2.columnName = 'todo';
		column2.isResolutionSet = false;
		column2.status = 'todo';

		await columnRepository.post(column1);
		await columnRepository.post(column2);
		await getRepository('board').save(board);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
