import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { validateProject } from '../../validators/validateProjects.validator';
import { projectsErrorMessages } from '../constants/projects.constants';
import { UserProfile } from '../entity/UserProfile';
import { Projects } from '../entity/Projects';
import { ProjectsRepository } from '../repositories/projects.repository';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';

class ProjectsController {
	getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id: userId } = req.user;

		try {
			const allProjects = await projectsRepository.getAll(userId);
			res.send(allProjects);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
		}
	};

	getProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const { id } = req.params;
			const { id: userId } = req.user;
			const project = await projectsRepository.getOneProject(id, userId);

			if (project === undefined) {
				throw new Error();
			}

			res.send(project);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
		}
	};

	createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const projectData = req.body.project as Projects;

			const { id: creatorId } = req.user;
			const user = new UserProfile();

			user.id = creatorId;

			const project = {
				...new Projects(),
				...projectData,
				creator: user,
				lead: user,
				users: [user],
			};

			const validationErrors = await validateProject(project);

			if (validationErrors.length > 0) {
				next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
				return;
			}

			const { key } = project;
			const isKeyAllowedResult = await this.isKeyAllowed(key, next);

			if (!isKeyAllowedResult) {
				return;
			}

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
			const { id: projectId, key } = project;
			const validationErrors = await validateProject(project);

			if (validationErrors.length > 0) {
				next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
				return;
			}

			const prevProject = await projectsRepository.getOne(projectId);

			if (prevProject === undefined) {
				next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
				return;
			}

			const isKeyAllowedResult = await this.isKeyAllowed(key, next, projectId);

			if (!isKeyAllowedResult) {
				return;
			}

			const { id: prevProjectLeadId } = prevProject.lead;
			const { users: prevProjectUsers } = prevProject;

			const isLeadInUsers = prevProjectUsers.find((user) => user.id === prevProjectLeadId);

			if (!isLeadInUsers) {
				next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
				return;
			}

			const { id: userId } = req.user;

			const isForbiddenResult = this.isForbidden(userId, prevProjectLeadId, next);

			if (isForbiddenResult) {
				return;
			}

			const projectToUpdate = { ...prevProject, ...project };
			delete projectToUpdate.creator;
			delete projectToUpdate.createdDate;
			delete projectToUpdate.updatedDate;
			delete projectToUpdate.deletedDate;
			delete projectToUpdate.version;

			const updatedProject = await projectsRepository.updateOne(projectToUpdate);
			res.send(updatedProject);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
		}
	};

	deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);

		try {
			const { id } = req.body;
			const project = await projectsRepository.getOne(id);

			if (!project) {
				next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
				return;
			}

			const { id: userId } = req.user;
			const { id: projectLeadId } = project.lead;

			const isForbiddenResult = this.isForbidden(userId, projectLeadId, next);

			if (isForbiddenResult) {
				return;
			}

			const deletedProject = await projectsRepository.deleteOneById(id);
			res.send(deletedProject);
		} catch (err) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, err.message));
		}
	};

	protected isKeyAllowed = async (key: string, next: NextFunction, projectId?: string): Promise<boolean> => {
		let isAllowed = true;
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const projectByKey = await projectsRepository.getOneByKey(key);

		if (projectId && projectByKey?.id !== projectId) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.PROJECT_EXISTS));
			isAllowed = false;
		}

		if (!projectId && projectByKey) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.PROJECT_EXISTS));
			isAllowed = false;
		}
		return isAllowed;
	};

	protected isForbidden = (userId: string, leadId: string, next: NextFunction): boolean => {
		let result = false;
		if (userId !== leadId) {
			next(new ErrorResponse(HttpStatusCode.FORBIDDEN, projectsErrorMessages.FORBIDDEN));
			result = true;
		}
		return result;
	};

	getAllKeys = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const keys = await projectsRepository.getKeys();
		res.send(keys);
	};
}

export default ProjectsController;
