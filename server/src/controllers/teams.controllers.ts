import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TeamRepository } from '../repositories/teams.repository';
import { getWebError } from '../helpers/error.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

class TeamsController {
	getTeams = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		try {
			const teams = await teamRepository.findAll();
			res.send(teams);
		} catch (error) {
			res.status(400).send(getWebError(error, 400));
		}
	};

	getTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;

		try {
			const team = await teamRepository.findOneById(id);
			res.send(team);
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	};

	createTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		try {
			const team = await teamRepository.createOne(req.body);
			res.send(team);
		} catch (error) {
			res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send(
				getWebError(error, HttpStatusCode.UNPROCESSABLE_ENTITY),
			);
		}
	};

	updateTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;
		try {
			const updatedTeam = await teamRepository.updateOneById(id, req.body);
			res.status(200).send(updatedTeam);
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};

	deleteTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;

		try {
			const result = await teamRepository.deleteOneById(id);
			res.send(result);
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};
}

export default TeamsController;
