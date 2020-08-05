import { getCustomRepository, getRepository } from 'typeorm';
import { BoardRepository } from '../repositories/board.repository';
import { BoardColumn } from '../entity/BoardColumn';

export class BoardSeeder {
	public static async execute() {

		await getRepository('Board').save([
			{ boardType: 'first' },
			{ boardType: 'second' },
		]);

		const boardRepository = getCustomRepository(BoardRepository);
		const columnRepository = getRepository('BoardColumn');

		const board = await boardRepository.findByType('first');

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
}
