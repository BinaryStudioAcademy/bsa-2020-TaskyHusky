import { getRepository, MigrationInterface, QueryRunner, getCustomRepository } from 'typeorm';
import { BoardColumn } from '../entity/BoardColumn';
import { BoardRepository } from '../repositories/board.repository';

export class BoardColumns1596468583404 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		const boardRepository = getCustomRepository(BoardRepository);
		const columnRepository = getRepository('BoardColumn');

		const board = await boardRepository.findByType('first');
		const column1 = new BoardColumn();

		column1.board = board;
		column1.columnName='one';
		column1.isResolutionSet=false;
		column1.status='unknown';

		await columnRepository.save(column1);
		await getRepository('board').save(board);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}
