import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BoardRepository } from '../repositories/board.repository';

class BoardController {
	private boardRepository = getCustomRepository(BoardRepository);

	getAll = async (req: Request, res: Response): Promise<void> => {
		const boards = await this.boardRepository.getAll();

		res.status(200).send(boards);
	};
}

export default BoardController;
