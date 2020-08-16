import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SprintRepository } from '../repositories/sprint.repository';
import { BoardRepository } from '../repositories/board.repository';
import { BoardColumnRepository } from '../repositories/boardColumn.repository';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { Sprint } from '../entity/Sprint';

class BoardController {
	getAll = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const boards = await boardRepository.getAll();

		res.status(200).send(boards);
	};

	getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;

		try {
			const board = await boardRepository.getOne(id);
			res.status(200).send(board);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	getRecent = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const boards = await boardRepository.getRecent();

		res.status(200).send(boards.slice(0, 5));
	};

	getBoardColumns = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const columnsRepository = getCustomRepository(BoardColumnRepository);
		const { id } = req.params;
		try {
			await boardRepository.getOne(id);
			const columns = await columnsRepository.getBoardColumns(id);

			res.status(200).send(columns);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	getBoardProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;
		try {
			const projects = await boardRepository.getProjects(id);

			res.status(200).send(projects);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	getBoardSprints = async (req: Request, res: Response, next: NextFunction) => {
		const boardRepository = getCustomRepository(BoardRepository);
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const boardSprintsIds = (await boardRepository.getSprints(id)) as Sprint[];

			const sprints = await Promise.all(
				boardSprintsIds.map(async (sprintId) => {
					let sprintData;

					if (typeof sprintId === 'string') {
						sprintData = await sprintRepository.findOneById(sprintId);
					}

					return sprintData;
				}),
			);

			res.status(200).send(sprints);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};

	put = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;
		const { body } = req;

		try {
			const board = await boardRepository.put(id, body);

			res.status(200).send(board);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { body } = req;

		try {
			const board = await boardRepository.post(body);

			res.status(200).send(board);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, e.message));
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;

		try {
			const board = await boardRepository.deleteBoard(id);

			res.status(200).send(board);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};
}

export default BoardController;
