import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BoardColumnRepository } from '../repositories/boardColumn.repository';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

class BoardColumnController {
	getAll = async (req: Request, res: Response): Promise<void> => {
		const boardColumnRepository = getCustomRepository(BoardColumnRepository);
		const boards = await boardColumnRepository.getAll();

		res.status(200).send(boards);
	};

	getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardColumnRepository = getCustomRepository(BoardColumnRepository);
		const { id } = req.params;

		try {
			const board = await boardColumnRepository.getOne(id);
			res.status(200).send(board);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	put = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardColumnRepository = getCustomRepository(BoardColumnRepository);
		const { id } = req.params;
		const { body } = req;

		try {
			const boardColumns = await boardColumnRepository.put(id, body);

			res.status(200).send(boardColumns);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardColumnRepository = getCustomRepository(BoardColumnRepository);
		const { body } = req;

		try {
			const column = await boardColumnRepository.post(body);
			res.status(200).send(column);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const boardColumnRepository = getCustomRepository(BoardColumnRepository);
		const { id } = req.params;

		try {
			const column = await boardColumnRepository.deleteColumn(id);
			res.status(200).send(column);
		} catch (e) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, e.message));
		}
	};
}

export default BoardColumnController;
