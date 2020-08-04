import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FilterPartRepository } from '../repositories/filterPart.repository';

const mockedFilterParts = [{
	id: '1',
	filterId: '1',
	filterDefId: '1',
	searchText: 'Filter Description'
}];

class FilterPartController {
	getFilterParts = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);

		try {
			const filterParts = await filterPartRepository.getAll();
			// res.send(filterParts);
			res.send(mockedFilterParts);
		} catch (error) {
			res.status(401).send();
		}
	};

	getById = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);
		const { id } = req.params;

		try {
			const filterPart = await filterPartRepository.getById(id);
			res.send(filterPart);
		} catch (error) {
			res.status(401).send();
		}
	};

	create = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);
		const { body } = req;

		try {
			const filterPart = await filterPartRepository.createItem(body);
			res.send(filterPart);
		} catch (error) {
			res.status(401).send();
		}
	};

	updateById = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);
		const { id } = req.params;
		const { body } = req;

		try {
			const filterPart = await filterPartRepository.updateById(id, body);
			res.send(filterPart);
		} catch (error) {
			res.status(401).send();
		}
	};

	deleteById = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);
		const { id } = req.params;

		try {
			const filterPart = await filterPartRepository.deleteById(id);
			res.send(filterPart);
		} catch (error) {
			res.status(401).send();
		}
	};
}

export default FilterPartController;
