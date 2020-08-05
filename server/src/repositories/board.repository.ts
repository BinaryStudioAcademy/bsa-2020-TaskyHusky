import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entity/Board';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
	findByType(boardType: string) {
		return this.findOneOrFail({ where: { boardType } });
	}

	getAll() {
		return this.find();
	}

	async getOne(id: string) {
		const board = await this
			.createQueryBuilder('board')
			.where('board.id = :id', { id })
			.innerJoinAndSelect('board.createdBy', 'user')
			.getOne();

		if (!board) {
			throw new Error('Board with this ID does not exist');
		}

		return board;
	}

	async put(id: string, data: any) {
		let board = await this.getOne(id);
		board = { ...board, ...data };

		return this.save([board]);
	}

	post(data: any) {
		let board = new Board();
		board = { ...board, ...data };

		return this.save([board]);
	}

	async deleteBoard(id: string) {
		const board = await this.getOne(id);

		return this.remove([board]);
	}
}
