import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FilterRepository } from '../repositories/filter.repository';

const mockedFilters = [{
	id: '1',
	ownerId: '1',
	name: 'Done tasks'
}];

class FilterController {
	getFilters = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);

		try {
			const filters = await filterRepository.getAll();
			// res.send(filters);
			res.send(mockedFilters);
		} catch (error) {
			res.status(401).send();
		}
	};

	getById = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id } = req.params;

		try {
			const filter = await filterRepository.getById(id);
			res.send(filter);
		} catch (error) {
			res.status(401).send();
		}
	};

	create = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { body } = req;

		try {
			const filter = await filterRepository.createItem(body);
			res.send(filter);
		} catch (error) {
			res.status(401).send();
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
			res.status(401).send();
		}
	};

	deleteById = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id } = req.params;

		try {
			const filter = await filterRepository.deleteById(id);
			res.send(filter);
		} catch (error) {
			res.status(401).send();
		}
	};
}

export default FilterController;
