import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FilterRepository } from '../repositories/filter.repository';

class FilterController {
	getFilters = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);

		try {
			const filters = await filterRepository.getAll();
			res.send(filters);
		} catch (error) {
			const { status }: { status: number } = error;
			res.status(status);
		}
	};

	getById = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id } = req.params;

		try {
			const filter = await filterRepository.getById(id);
			res.send(filter);
		} catch (error) {
			res.status(404).send();
		}
	};

	create = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { body } = req;

		try {
			const filter = await filterRepository.createItem(body);
			res.send(filter);
		} catch (error) {
			const { status }: { status: number } = error;
			res.status(status);
		}
	};

	updateById = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id } = req.params;
		const { body } = req;

		try {
			const filter = await filterRepository.updateById(id, body);
			res.send(filter);
		} catch (error) {
			res.status(404).send();
		}
	};

	deleteById = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id } = req.params;

		try {
			const filter = await filterRepository.deleteById(id);
			res.send(filter);
		} catch (error) {
			res.status(404).send();
		}
	};
}

export default FilterController;
