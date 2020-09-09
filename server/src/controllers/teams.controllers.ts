import { v4 } from 'uuid';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TeamRepository } from '../repositories/teams.repository';
import { ProjectsRepository } from '../repositories/projects.repository';
import { getWebError } from '../helpers/error.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { linksParse } from '../helpers/team.parser';

class TeamsController {
	getTeams = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.user;
		const teamRepository = getCustomRepository(TeamRepository);
		try {
			const teams = await teamRepository.findAll(id);

			res.send(teams);
		} catch (error) {
			res.status(400).send(getWebError(error, 400));
		}
	};

	getTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;
		try {
			const team: any = await teamRepository.findTeamById(id);
			res.send(linksParse(team));
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	};

	getTeamUsers = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;
		try {
			const team: any = await teamRepository.findTeamUsersById(id);
			res.send(team);
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	};

	getTeamsIssues = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id } = req.params;
		try {
			const projects: any = await projectsRepository.getProjectWithIssuesByTeamId(id);
			let issues: any = [];
			projects.forEach((project: any) => {
				issues = issues.concat(project.issues.map((item: any) => ({ ...item, project })));
			});
			const sortedIssues = issues
				.sort(({ updatedAt: firstDate = '' }, { updatedAt: secondDate = '' }) => {
					return Number(new Date(secondDate)) - Number(new Date(firstDate));
				})
				.slice(0, 10);
			res.send(sortedIssues);
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	};

	getTeamProjects = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;
		try {
			const team: any = await teamRepository.findTeamProjectsById(id);
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
			res.status(200).send(linksParse(updatedTeam));
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};

	addUsersToTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { users, id } = req.body;
		try {
			const updatedTeam = await teamRepository.addPeopleToTeam(id, users);
			res.status(200).send(linksParse(updatedTeam));
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};

	updateTeamsFields = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;
		const { data } = req.body;
		try {
			const updatedTeam: any = await teamRepository.findOne(id);
			let links: string[];
			if (!data.id) {
				data.id = v4();
				const newEl: string = JSON.stringify(data);
				links = [newEl, ...updatedTeam.links];
			} else {
				links = updatedTeam.links.map((el: string) => {
					const item = JSON.parse(el);
					return item.id === data.id ? JSON.stringify({ ...data }) : el;
				});
			}
			const result = await teamRepository.updateOneById(id, { links });
			res.status(200).send(linksParse(result));
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};

	deleteTeamsFields = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { id } = req.params;
		const { data } = req.body;
		try {
			const updatedTeam: any = await teamRepository.findOne(id);
			const links: string[] = updatedTeam.links.filter((el: string) => {
				const item = JSON.parse(el);
				return item.id !== data.id;
			});
			const result: any = await teamRepository.updateOneById(id, { links });
			res.status(200).send(linksParse(result));
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

	removeOneUser = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamRepository);
		const { userId, teamId } = req.body;
		try {
			const result = await teamRepository.removeUserFromTeam(userId, teamId);
			res.send(result);
		} catch (error) {
			res.status(HttpStatusCode.NOT_FOUND).send(getWebError(error, HttpStatusCode.NOT_FOUND));
		}
	};
}

export default TeamsController;
