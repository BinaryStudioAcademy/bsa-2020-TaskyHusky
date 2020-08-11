import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { Board } from '../entity/Board';
import { UserRepository } from './user.repository';
import { IBoardModel, IReducedBoard } from '../models/Board';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
	findByType(boardType: string) {
		return this.findOneOrFail({ where: { boardType } });
	}

	getAll = async (): Promise<IBoardModel[]> => {
		const extendedBoards = await this.find().then(boards =>
			boards.map(async (board) => this.getOne(board.id)),
		);

		return Promise.all(extendedBoards);
	};

	getRecent = ():Promise<IReducedBoard[]> => {
		const boards = this
			.createQueryBuilder('board')
			.select(['board.id', 'board.name'])
			.orderBy('board.createdAt', 'DESC')
			.getMany()

		return boards;
	};

	async getOne(id: string) {
		const board = <IBoardModel>await this
			.createQueryBuilder('board')
			.where('board.id = :id', { id })
			.innerJoin('board.createdBy', 'user')
			.addSelect('user.id')
			.addSelect('user.firstName')
			.addSelect('user.lastName')
			.addSelect('user.avatar')
			.getOne();

		if (!board) {
			throw new Error('Board with this ID does not exist');
		}

		return board;
	}

	async put(id: string, data: any) {
		const userRepository = getCustomRepository(UserRepository);

		let board = await this.getOne(id);
		const { createdBy: user, ...dataToCreate } = data;

		if (user) {
			const userToAdd = await userRepository.getById(user.id);
			if (!userToAdd) throw new Error('User with current ID not found');

			board = { ...board, ...dataToCreate, createdBy: userToAdd };
		} else {
			board = { ...board, ...dataToCreate };
		}

		return this.save([board]);
	}

	async post(data: any) {
		const userRepository = getCustomRepository(UserRepository);
		const { createdBy: user, ...dataToCreate } = data;

		const userToAdd = await userRepository.getById(user.id);
		if (!userToAdd) throw new Error('User with current ID not found');

		let board = new Board();
		board = { ...board, ...dataToCreate, createdBy: userToAdd };

		return this.save([board]);
	}

	async deleteBoard(id: string) {
		const board = await this.getOne(id);

		return this.remove([board]);
	}
}
