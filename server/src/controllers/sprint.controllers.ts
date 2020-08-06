import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { getWebError } from '../helpers/error.helper';
import { SprintRepository } from '../repositories/sprint.repository';

class SprintController {
	async getAll(req: Request, res: Response) {
		const repository = getCustomRepository(SprintRepository);

		try {
			const result = await repository.findAll();
			res.send(result);
		} catch (error) {
			res.status(500).send(getWebError(error, 500));
		}
	}

	async getById(req: Request, res: Response) {
		const repository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const result = await repository.findOneById(id);
			res.send(result);
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	}

	async create(req: Request, res: Response) {
		const repository = getCustomRepository(SprintRepository);

		try {
			const { body: data } = req;
			const result = repository.createOne(data);
			res.status(201).send(result);
		} catch (error) {
			res.status(422).send(getWebError(error, 422));
		}
	}

	async update(req: Request, res: Response) {
		const repository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const { body: data } = req;
			const result = await repository.updateOneById(id, data);
			res.send(result);
		} catch (error) {
			res.send(404).send(getWebError(error, 404));
		}
	}

	async delete(req: Request, res: Response) {
		const repository = getCustomRepository(SprintRepository);

		try {
			const { id } = req.params;
			const result = await repository.deleteOneById(id);
			res.send(result);
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	}
}

export default SprintController;
