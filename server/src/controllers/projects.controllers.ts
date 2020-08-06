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
		const { id } = req.params;

		try {
			await this.checkForExisting(id);
			const project = await projectsRepository.findOneById(id);
			res.send(project);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	createProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id: userId } = req.user as User;
		const projectData = req.body as Projects;
		const { id } = projectData;

		projectData.creatorID = userId;

		try {
			await this.checkForNoExisting(id);
			const createdProject = await projectsRepository.createOne(projectData);
			res.status(201).send(createdProject);
		} catch (err) {
			res.status(409).send(getWebError(err, 409));
		}
	};

	updateProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const projectData = req.body;
		const { id } = projectData;

		try {
			await this.checkForExisting(id);
			const updatedProject = await projectsRepository.updateOne(projectData);
			res.send(updatedProject);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	deleteProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id } = req.body;

		try {
			await this.checkForExisting(id);
			const deletedProject = await projectsRepository.deleteOneById(id);
			res.send(deletedProject);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	};

	protected getOneProjectById = async (id: string) => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const project = await projectsRepository.findOneById(id);
		return project;
	};

	protected checkForExisting = async (id: string) => {
		const project = await this.getOneProjectById(id);

		if (!project) {
			throw new Error('Not found');
		}
	};

	protected checkForNoExisting = async (id: string) => {
		const project = await this.getOneProjectById(id);

		if (project) {
			throw new Error('Project exists');
		}
	};
}

export default ProjectsController;
