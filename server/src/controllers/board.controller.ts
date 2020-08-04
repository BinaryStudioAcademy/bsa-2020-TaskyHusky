import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BoardRepository } from '../repositories/board.repository';

class BoardController {
	getAll = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const boards = await boardRepository.getAll();

		res.status(200).send(boards);
	};

	getOne = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;

		try {
			const board = await boardRepository.getOne(id);
			res.status(200).send(board);
		} catch (e) {
			res.status(404).send('Not Found');
		}
	};

	getOneWithColumn = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;
		try {
			await boardRepository.getOne(id);
			const board = await boardRepository.getOneWithColumn(id);

			if (!board) {
				res.status(400).send('Please add columns');
				return;
			}

			res.status(200).send(board);
		} catch (e) {
			res.status(404).send('Not Found');
		}
	};

	put = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;
		const { body } = req;

		try {
			const board = await boardRepository.put(id, body);

			res.status(200).send(board);
		} catch (e) {
			res.status(404).send('Not Found');
		}
	};

	post = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { body } = req;

		const board = await boardRepository.post(body);

		res.status(200).send(board);

	};

	delete = async (req: Request, res: Response): Promise<void> => {
		const boardRepository = getCustomRepository(BoardRepository);
		const { id } = req.params;

		try {
			const board = await boardRepository.deleteBoard(id);

			res.status(200).send(board);
		} catch (e) {
			res.status(404).send('Not Found');
		}
	};
}

export default BoardController;
