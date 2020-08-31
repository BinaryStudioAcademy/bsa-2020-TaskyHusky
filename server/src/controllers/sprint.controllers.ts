import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { SprintRepository } from '../repositories/sprint.repository';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

enum ErrorMessage {
	NO_PROJECT = 'this sprint is not assigned to any project yet',
	NO_BOARD = 'this sprint is not assigned to any board yet',
	NO_ISSUES = 'no issues assigned to this sprint yet',
}

class SprintController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const result = await sprintRepository.findAll();

			res.send(result);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const result = await sprintRepository.findOneById(id);
			res.send(result);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { body: data } = req;
			const result = await sprintRepository.createOne(data);
			res.status(HttpStatusCode.CREATED).send(result);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, error.message));
		}
	}

	async updateById(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const { body: data } = req;
			const result = await sprintRepository.updateOneById(id, data);
			res.send(result);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	}

	async deleteById(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const result = await sprintRepository.deleteOneById(id);
			res.send(result);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	}

	async getProjectById(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const sprint = await sprintRepository.findOneById(id);

			if (sprint.project) {
				res.send(sprint.project);
			}

			if (!sprint.project) {
				next(new ErrorResponse(HttpStatusCode.NOT_FOUND, ErrorMessage.NO_PROJECT));
			}
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	}

	async getBoardById(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const sprint = await sprintRepository.findOneById(id);

			if (sprint.board) {
				res.send(sprint.board);
			}

			if (!sprint.board) {
				next(new ErrorResponse(HttpStatusCode.NOT_FOUND, ErrorMessage.NO_BOARD));
			}
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	}

	async getIssuesById(req: Request, res: Response, next: NextFunction) {
		const sprintRepository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const sprint = await sprintRepository.findOneById(id);

			if (sprint.issues) {
				res.send(sprint.issues);
			}

			// ACTUALLY SHOULD NEVER HAPPEN, IF THIS TRIGGER - SOMETHING CAN BE WRONG ON ENTITY SIDE
			if (!sprint.issues) {
				next(new ErrorResponse(HttpStatusCode.NOT_FOUND, ErrorMessage.NO_ISSUES));
			}
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	}
}

export default SprintController;
