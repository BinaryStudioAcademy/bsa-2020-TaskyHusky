import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FilterRepository } from '../repositories/filter.repository';

export type FilterBy = {
	userId: string;
};

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

	getTeammateFilters = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);

		const { userId } = req.params;

		try {
			const filters = await filterRepository.getTeammateFilters(userId as string);
			res.send(filters);
		} catch (error) {
			const { status }: { status: number } = error;
			res.status(status);
		}
	};

	getRecentFilters = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id: userId } = req.user;

		try {
			const filters = await filterRepository.getRecentFilters(userId);
			res.send(filters);
		} catch (error) {
			const { status }: { status: number } = error;
			res.status(status).send();
		}
	};

	getFavFilters = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id: userId } = req.user;

		try {
			const filters = await filterRepository.getFavFilters(userId);
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

	updateFilter = async (req: Request, res: Response): Promise<void> => {
		const filterRepository = getCustomRepository(FilterRepository);
		const { id } = req.params;
		const { body } = req;

		try {
			const filter = await filterRepository.updateItem(body);
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
