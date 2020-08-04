import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { FilterDefinitionRepository } from '../repositories/filterDefinition.repository';

const mockedFilterDefs = [{
	id: '1',
	filterType: 'CheckBox',
	itemType: 'string',
	title: 'Status'
}];

class FilterDefinitionController {
	getFilterDefinitions = async (req: Request, res: Response): Promise<void> => {
		const filterDefinitionRepository = getCustomRepository(FilterDefinitionRepository);

		try {
			const filterDefinitions = await filterDefinitionRepository.getAll();
			// res.send(filterDefinitions);
			res.send(mockedFilterDefs);
		} catch (error) {
			res.status(401).send();
		}
	};

	getById = async (req: Request, res: Response): Promise<void> => {
		const filterDefinitionRepository = getCustomRepository(FilterDefinitionRepository);
		const { id } = req.params;

		try {
			const filterDefinition = await filterDefinitionRepository.getById(id);
			res.send(filterDefinition);
		} catch (error) {
			res.status(401).send();
		}
	};

	create = async (req: Request, res: Response): Promise<void> => {
		const filterDefinitionRepository = getCustomRepository(FilterDefinitionRepository);
		const { body } = req;

		try {
			const filterDefinition = await filterDefinitionRepository.createItem(body);
			res.send(filterDefinition);
		} catch (error) {
			res.status(401).send();
		}
	};

	updateById = async (req: Request, res: Response): Promise<void> => {
		const filterDefinitionRepository = getCustomRepository(FilterDefinitionRepository);
		const { id } = req.params;
		const { body } = req;

		try {
			const filterDefinition = await filterDefinitionRepository.updateById(id, body);
			res.send(filterDefinition);
		} catch (error) {
			res.status(401).send();
		}
	};

	deleteById = async (req: Request, res: Response): Promise<void> => {
		const filterDefinitionRepository = getCustomRepository(FilterDefinitionRepository);
		const { id } = req.params;

		try {
			const filterDefinition = await filterDefinitionRepository.deleteById(id);
			res.send(filterDefinition);
		} catch (error) {
			res.status(401).send();
		}
	};
}

export default FilterDefinitionController;
