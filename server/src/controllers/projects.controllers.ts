import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { projectsErrorMessages } from '../constants/projects.contants';
import { UserProfile } from '../entity/UserProfile';
import { Projects } from '../entity/Projects';
import { ProjectsRepository } from '../repositories/projects.repository';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

class ProjectsController {
	getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const allProjects = await projectsRepository.findAll();
			res.send(allProjects);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
		}
	};

	getProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const { id } = req.params;
			const project = await projectsRepository.getOne(id);
			res.send(project);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
		}
	};

	createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const projectData = req.body.project as Projects;
			const { key } = projectData;

			const isKeyExists = await this.getOneProject(key, 'key');

			if (isKeyExists) {
				return next(new ErrorResponse(HttpStatusCode.CONFLICT, projectsErrorMessages.PROJECT_EXISTS));
			}

			const { id: creatorId } = req.user as UserProfile;
			const user = new UserProfile();
			user.id = creatorId;
			user.leadedProjects = [projectData];

			const project = {
				...new Projects(),
				...projectData,
				creator: user,
				lead: user,
			};

			const createdProject = await projectsRepository.createOne(project);
			res.status(201).send(createdProject);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
		}
	};

	updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const { project } = req.body;
			const { id } = project;
			const isProjectExists = await this.getOneProject(id, 'id');

			if (!isProjectExists) {
				return next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
			}

			const updatedProject = await projectsRepository.updateOne(project);
			res.send(updatedProject);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
		}
	};

	deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const { id } = req.body;
			const isProjectExists = await this.getOneProject(id, 'id');

			if (!isProjectExists) {
				return next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
			}

			const deletedProject = await projectsRepository.deleteOneById(id);
			res.send(deletedProject);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
		}
	};

	protected getOneProject = async (value: string, prop: string) => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const project = await projectsRepository.getOneProject(value, prop);
		return project;
	};
}

export default ProjectsController;
