import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BoardColumn } from '../entity/BoardColumn';
import { BoardRepository } from './board.repository';

@EntityRepository(BoardColumn)
export class BoardColumnRepository extends Repository<BoardColumn> {
	getAll() {
		return this
			.createQueryBuilder('boardColumn')
			.innerJoin('boardColumn.board', 'board')
			.addSelect('board.boardID')
			.getMany();
	};

	getBoardColumns(id: string) {
		return this
			.createQueryBuilder('boardColumn')
			.innerJoin('boardColumn.board', 'board')
			.addSelect('board.boardID')
			.where('board.boardID = :boardID', { boardID: id })
			.getMany();
	}

	async getOne(id: string) {
		const column = await this
			.createQueryBuilder('boardColumn')
			.where('boardColumn.columnID = :columnID', { columnID: id })
			.innerJoin('boardColumn.board', 'board')
			.addSelect('board.boardID')
			.getOne();

		if (!column) {
			throw new Error('This id does not exist');
		}

		return column;
	}

	async put(id: string, data: any) {
		const boardRepository = getCustomRepository(BoardRepository);

		let boardColumn = await this.getOne(id);
		const { board, ...dataToCreate } = data;

		if (board) {
			const boardToAdd = await boardRepository.getOne(board.boardID);

			boardColumn = { ...boardColumn, ...dataToCreate, board: boardToAdd };
		} else {
			boardColumn = { ...boardColumn, ...dataToCreate };
		}

		return this.save([boardColumn]);
	}

	async post(data: any) {
		const boardRepository = getCustomRepository(BoardRepository);
		const { board, ...dataToCreate } = data;
		const boardToAdd = await boardRepository.getOne(board.boardID);

		let boardColumn = new BoardColumn();
		boardColumn = { ...boardColumn, ...dataToCreate, board: boardToAdd };

		return this.save([boardColumn]);
	}

	async deleteColumn(id: string) {
		const boardColumn = await this.getOne(id);

		return this.remove([boardColumn]);
	}
}
