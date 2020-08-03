import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ExampleRepository } from '../repositories/example.repository';

class ExampleController {
	getExample = async (req: Request, res: Response): Promise<void> => {
		const exampleRepository = getCustomRepository(ExampleRepository);
		const { name } = req.params;

		try {
			const example = await exampleRepository.findByName(name);
			res.send(example);
		} catch (error) {
			res.status(401).send();
		}
	};
}

export default ExampleController;
