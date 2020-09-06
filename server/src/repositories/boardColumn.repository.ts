import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BoardColumn } from '../entity/BoardColumn';
import { BoardRepository } from './board.repository';

@EntityRepository(BoardColumn)
export class BoardColumnRepository extends Repository<BoardColumn> {
	getAll() {
		return this.createQueryBuilder('boardColumn')
			.innerJoin('boardColumn.board', 'board')
			.addSelect('board.id')
			.getMany();
	}

	getBoardColumns(id: string) {
		return this.createQueryBuilder('boardColumn')
			.innerJoin('boardColumn.board', 'board')
			.addSelect('board.id')
			.where('board.id = :id', { id })
			.orderBy('index', 'ASC')
			.getMany();
	}

	async getOne(id: string) {
		const column = await this.createQueryBuilder('boardColumn')
			.where('boardColumn.id = :id', { id })
			.innerJoin('boardColumn.board', 'board')
			.addSelect('board.id')
			.getOne();

		if (!column) {
			throw new Error('Column with this ID does not exist');
		}

		return column;
	}

	async put(id: string, data: any) {
		const boardRepository = getCustomRepository(BoardRepository);

		let boardColumn = await this.getOne(id);
		const { board, ...dataToCreate } = data;

		if (board) {
			const boardToAdd = await boardRepository.getOne(board.id);

			boardColumn = { ...boardColumn, ...dataToCreate, board: boardToAdd };
		} else {
			boardColumn = { ...boardColumn, ...dataToCreate };
		}

		return this.save([boardColumn]);
	}

	async post(data: any) {
		const instance = this.create(data);
		return this.save(instance);
	}

	async deleteColumn(id: string) {
		const boardColumn = await this.getOne(id);

		return this.remove([boardColumn]);
	}
}
