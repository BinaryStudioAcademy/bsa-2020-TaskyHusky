import { getCustomRepository, getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { BoardRepository } from '../repositories/board.repository';
import { BoardColumn } from '../entity/BoardColumn';
import { Board } from '../entity/Board';
import { BoardType } from '../models/Board';
import { UserRepository } from '../repositories/user.repository';

export class Board1596645901833 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const userRepository = getCustomRepository(UserRepository);
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const user1 = (await userRepository.getByEmail('test@test.com'))!;

		const board1 = new Board();
		board1.boardType = BoardType.Kanban;
		board1.createdBy = user1;
		board1.name = 'Table1';
		board1.location = 'Ukraine';

		const board2 = new Board();
		board2.boardType = BoardType.Scrum;
		board2.createdBy = user1;
		board2.name = 'Table2';
		board2.location = 'USA';

		await getRepository('Board').save([board1, board2]);

		const boardRepository = getCustomRepository(BoardRepository);
		const columnRepository = getRepository('BoardColumn');

		const board = await boardRepository.findByType(BoardType.Kanban);

		const column1 = new BoardColumn();
		column1.board = board;
		column1.columnName = 'one';
		column1.isResolutionSet = false;
		column1.status = 'unknown';

		const column2 = new BoardColumn();
		column2.board = board;
		column2.columnName = 'two';
		column2.isResolutionSet = true;
		column2.status = 'unknown';

		await columnRepository.save(column1);
		await columnRepository.save(column2);
		await getRepository('board').save(board);
	}

	public async down(queryRunner: QueryRunner): Promise<void> { }
}
