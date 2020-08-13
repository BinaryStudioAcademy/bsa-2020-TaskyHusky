import { v4 } from 'uuid';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../repositories/teams.repository';
import { getWebError } from '../helpers/error.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { linksParse } from '../helpers/team.parser';

class TeamsController {
	getTeams = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		try {
			const teams = await teamRepository.findAll();
			res.send(teams);
		} catch (error) {
			res.status(400).send(getWebError(error, 400));
		}
	}

	getTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;
		try {
			const team: any = await teamRepository.findOneById(id);
			res.send(linksParse(team));
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	};

	createTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		try {
			const team = await teamRepository.createOne(req.body);
			res.send(team);
		} catch (error) {
			res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send(getWebError(error, HttpStatusCode.UNPROCESSABLE_ENTITY));
		}
	}

	updateTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;
		try {
			const updatedTeam = await teamRepository.updateOneById(id, req.body);
			res.status(200).send(linksParse(updatedTeam));
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};

	updateTeamsFields = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;
		const { data } = req.body;
		try {
			const updatedTeam: any = await teamRepository.findOne(id);
			let links: string[] = [];
			if (!data.id) {
				data.id = v4();
				const newEl: string = JSON.stringify(data);
				links = [newEl, ...updatedTeam.links];
			} else {
				links = updatedTeam.links.map((el: string) => {
					const item = JSON.parse(el);
					return (item.id === data.id) ? JSON.stringify({ ...data }) : el;
				})
			}
			const result: any = await teamRepository.updateOneById(id, { links });
			res.status(200).send(linksParse(result));
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};

	deleteTeamsFields = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;
		const { data } = req.body;
		try {
			const updatedTeam: any = await teamRepository.findOne(id);
			const links = updatedTeam.links.filter((el: string) => {
				const item = JSON.parse(el);
				return item.id !== data.id
			})
			const result: any = await teamRepository.updateOneById(id, { links });
			res.status(200).send(linksParse(result));
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};

	deleteTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
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
