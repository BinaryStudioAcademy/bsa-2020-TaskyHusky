import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { ProjectsRepository } from '../repositories/projects.repository';

class ProjectsController {
	getAllProjects = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const allProjects = await projectsRepository.find();
			res.send(allProjects);
		} catch (error) {
			res.send(error); // !add error sender
		}
	};

	getProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id: projectID } = req.params;

		try {
			const allProjects = await projectsRepository.findOneOrFail(projectID);
			res.send(allProjects);
		} catch (error) {
			res.send(error);
		}
	};

	createProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const projectData = req.body;

		try {
			const isProjectsExists = await projectsRepository.findOne(projectData.projectID);

			if (isProjectsExists) {
				res.send({ message: 'project exists' });
			}

			const createdProject = await projectsRepository.save(projectData);
			res.status(201).send(createdProject);
		} catch (error) {
			res.send(error);
		}
	};

	updateProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const projectData = req.body;

		try {
			const isProjectsExists = await projectsRepository.findOne(projectData.projectID);

			if (!isProjectsExists) {
				res.send({ message: 'project does not exist' });
			}

			const updatedProject = await projectsRepository.save(projectData);
			res.send(updatedProject);
		} catch (error) {
			res.send(error);
		}
	};

	deleteProject = async (req: Request, res: Response): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const projectData = req.body;

		try {
			const isProjectsExists = await projectsRepository.findOne(projectData.projectID);

			if (!isProjectsExists) {
				res.send({ message: 'project does not exist' });
			}

			const deletedProject = await projectsRepository.delete(projectData.projectID);
			res.send(deletedProject);
		} catch (error) {
			res.send(error);
		}
	};
}

export default ProjectsController;
