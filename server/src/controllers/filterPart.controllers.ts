import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FilterPartRepository } from '../repositories/filterPart.repository';

class FilterPartController {
	getFilterParts = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);

		try {
			const filterParts = await filterPartRepository.getAll();
			res.send(filterParts);
		} catch (error) {
			const { status }: { status: number } = error;
			res.status(status);
		}
	};

	getById = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);
		const { id } = req.params;

		try {
			const filterPart = await filterPartRepository.getById(id);
			res.send(filterPart);
		} catch (error) {
			res.status(404).send();
		}
	};

	create = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);
		const { body } = req;

		try {
			const filterPart = await filterPartRepository.createItem(body);
			res.send(filterPart);
		} catch (error) {
			res.status(404).send();
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
			res.status(404).send();
		}
	};

	deleteById = async (req: Request, res: Response): Promise<void> => {
		const filterPartRepository = getCustomRepository(FilterPartRepository);
		const { id } = req.params;

		try {
			const filterPart = await filterPartRepository.deleteById(id);
			res.send(filterPart);
		} catch (error) {
			res.status(404).send();
		}
	};
}

export default FilterPartController;
