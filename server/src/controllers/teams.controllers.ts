import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../repositories/teams.repository';

class TeamsController {
	getTeams = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		try {
			const teams = await teamRepository.findAll();
			res.send(teams);
		} catch (error) {
			res.status(404).send();
		}
	}

	getTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;

		try {
			const team = await teamRepository.findOneById(id);
			res.send(team);
		} catch (error) {
			res.status(404).send();
		}
	};

	updateTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		try {
			const updatedTeam = await teamRepository.updateOne(req.body);
			res.status(200).send(updatedTeam);
		} catch (error) {
			res.status(400).send(error.message);
		}
	};

	deleteTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;

		try {
			await teamRepository.deleteOneById(id);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	};
}

export default TeamsController;
