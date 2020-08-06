import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '../entity/User';
import { Projects } from '../entity/Projects';

import { ProjectsRepository } from '../repositories/projects.repository';
import { getWebError } from '../helpers/error.helper';

class ProjectsController {
	getAllProjects = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const allProjects = await projectsRepository.findAll();
			res.send(allProjects);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	getProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id: projectID } = req.params;

		try {
			await this.checkForExisting(projectID);
			const project = await projectsRepository.findOneById(projectID);
			res.send(project);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	createProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id: userId } = req.user as User;
		const { project } = req.body;
		project.creatorID = userId;

		try {
			const createdProject = await projectsRepository.createOne(project);
			res.status(201).send(createdProject);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	};

	updateProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const project = req.body;
		const { projectID } = project;

		try {
			await this.checkForExisting(projectID);
			const updatedProject = await projectsRepository.updateOne(project);
			res.send(updatedProject);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	deleteProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { projectID } = req.body;

		try {
			await this.checkForExisting(projectID);
			const deletedProject = await projectsRepository.deleteOneById(projectID);
			res.send(deletedProject);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	protected getOneProjectById = async (projectID: string) => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const project = await projectsRepository.findOneById(projectID);
		return project;
	};

	protected checkForExisting = async (projectID: string) => {
		const project = await this.getOneProjectById(projectID);

		if (!project) {
			throw new Error('Not found');
		}
	};

	protected checkForNoExisting = async (projectID: string) => {
		const project = await this.getOneProjectById(projectID);

		if (project) {
			throw new Error('Project exists');
		}
	};
}

export default ProjectsController;
