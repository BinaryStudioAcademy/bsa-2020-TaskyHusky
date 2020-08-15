import { EntityRepository, getCustomRepository, Repository, getRepository } from 'typeorm';
import { Board } from '../entity/Board';
import { UserRepository } from './user.repository';
import { IBoardModel, IReducedBoard } from '../models/Board';
import { Projects } from '../entity/Projects';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
	findByType(boardType: string) {
		return this.findOneOrFail({ where: { boardType } });
	}

	getAll = async (): Promise<IBoardModel[]> => {
		const extendedBoards = <IBoardModel[]>(
			(<unknown>(
				await this.createQueryBuilder('board')
					.innerJoin('board.createdBy', 'user')
					.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
					.getMany()
			))
		);

		return extendedBoards;
	};

	getRecent = (): Promise<IReducedBoard[]> => {
		const boards = this.createQueryBuilder('board')
			.select(['board.id', 'board.name'])
			.orderBy('board.createdAt', 'DESC')
			.getMany();

		return boards;
	};

	async getOne(id: string) {
		const board = <IBoardModel>(
			(<unknown>(
				await this.createQueryBuilder('board')
					.where('board.id = :id', { id })
					.innerJoin('board.createdBy', 'user')
					.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
					.getOne()
			))
		);

		if (!board) {
			throw new Error('Board with this ID does not exist');
		}

		return board;
	}

	async getProjects(id: string) {
		const board = await this.createQueryBuilder('board')
			.where('board.id = :id', { id })
			.leftJoinAndSelect('board.projects', 'project')
			.getOne();

		if (!board) {
			throw new Error('Board with this ID does not exist');
		}

		return board.projects;
	}

	async put(id: string, data: any) {
		const userRepository = getCustomRepository(UserRepository);

		let board = <Board>(<unknown>await this.getOne(id));
		const { createdBy: user, projects, ...dataToCreate } = data;

		if (user) {
			const userToAdd = await userRepository.getById(user.id);
			if (!userToAdd) throw new Error('User with current ID not found');

			board = { ...board, createdBy: userToAdd };
		}

		if (projects) {
			const projectPromises: Array<Promise<Projects>> = projects.map(
				(projectId: string): Promise<Projects> => {
					return <Promise<Projects>>getRepository('Projects').findOne({
						where: {
							id: projectId,
						},
					});
				},
			);

			const projectsToAdd = await Promise.all(projectPromises);

			board = { ...board, projects: projectsToAdd };
		}

		board = { ...board, ...dataToCreate };

		return this.save([board]);
	}

	async post(data: any) {
		const userRepository = getCustomRepository(UserRepository);
		const { createdBy: user, projects, ...dataToCreate } = data;

		const userToAdd = await userRepository.getById(user.id);
		if (!userToAdd) throw new Error('User with current ID not found');

		const projectPromises: Array<Promise<Projects>> = projects.map(
			(projectId: string): Promise<Projects> => {
				return <Promise<Projects>>getRepository('Projects').findOne({
					where: {
						id: projectId,
					},
				});
			},
		);

		const projectsToAdd = await Promise.all(projectPromises);

		let board = new Board();
		board = { ...board, ...dataToCreate, createdBy: userToAdd };

		return this.save([board]);
	}

	async deleteBoard(id: string) {
		const board: Board = <Board>(<unknown>await this.getOne(id));

		return this.remove([board]);
	}
}
