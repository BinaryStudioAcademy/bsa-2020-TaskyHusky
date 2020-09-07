import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProjectLabel } from '../entity/ProjectLabel';
import { validateLabel } from '../../validators/validateProjectLabel.validator';
import { validateProject } from '../../validators/validateProjects.validator';
import { projectsErrorMessages } from '../constants/projects.constants';
import { UserProfile } from '../entity/UserProfile';
import { Projects } from '../entity/Projects';
import { projectAvatarFolder } from '../../config/aws.config';
import { ProjectsRepository } from '../repositories/projects.repository';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import uploadS3 from '../services/file.service';

class ProjectsController {
	uploadAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id: projectId } = req.params;

		const project = await projectsRepository.getOne(projectId);

		if (project === undefined) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
			return;
		}

		const timestamp = +new Date();
		const name = `${projectId}_${timestamp}`;
		try {
			const avatar = await uploadS3(projectAvatarFolder, req.file, name);
			if (!avatar) {
				throw new Error('Could not update avatar');
			}
			const dataToUpdate = { ...project, avatar };
			const updatedProject = await projectsRepository.updateOne(dataToUpdate);
			res.send(updatedProject);
		} catch (error) {
			next(new ErrorResponse(400, error.message));
		}
	};

	getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { id: userId } = req.user;

		try {
			const allProjects = await projectsRepository.getAllByUserId(userId);
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

			delete project.users;

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

	updateProjectUsersList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { projectId, usersId } = req.body;

		const prevProject = await projectsRepository.getOne(projectId);

		if (prevProject === undefined) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
			return;
		}
		const { id: prevProjectLeadId } = prevProject.lead;
		const { users: prevProjectUsers } = prevProject;

		const isLeadInUsers = prevProjectUsers.find((user) => user.id === prevProjectLeadId);
		const isLead = usersId === prevProjectLeadId;

		if (!isLeadInUsers || isLead) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
			return;
		}

		const { id: userId } = req.user;

		const isForbiddenResult = this.isForbidden(userId, prevProjectLeadId, next);

		if (isForbiddenResult) {
			return;
		}

		if (usersId?.length === 0) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
			return;
		}

		const dataToUpdate = { ...prevProject };

		if (typeof usersId === 'string') {
			dataToUpdate.users = prevProject.users.filter((user) => user.id !== usersId);
		} else {
			const users = usersId?.map((data: string) => {
				if (typeof data === 'string') {
					const user = new UserProfile();
					user.id = data;
					return user;
				}
				return data;
			});
			dataToUpdate.users = [...prevProject.users, ...users];
		}

		const updatedProject = await projectsRepository.updateOne(dataToUpdate);
		res.send(updatedProject);
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

		if (projectId && projectByKey?.id && projectByKey?.id !== projectId) {
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

	createLabel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { projectId, label } = req.body;
		const { id: userId } = req.user;

		try {
			const isLabelDataValid = await this.validateLabelData(label, next);
			if (!isLabelDataValid) {
				return;
			}

			const project = await this.getProjectById(projectId, userId, projectsRepository, next);

			if (!project) {
				return;
			}

			const { labels: prevLabels } = project;
			const labelIndex = prevLabels.findIndex((labelItem) => labelItem.text === label.text);

			if (labelIndex !== -1) {
				next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
				return;
			}

			const updatedLabelsList = [...prevLabels, label];
			const dataToUpdate = { ...project, labels: updatedLabelsList };
			const updatedProject = await projectsRepository.updateOne(dataToUpdate);
			res.status(201).send(updatedProject);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
		}
	};

	updateLabel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { projectId, label } = req.body;
		const { id: userId } = req.user;

		try {
			const isLabelDataValid = await this.validateLabelData(label, next);
			if (!isLabelDataValid) {
				return;
			}

			const project = await this.getProjectById(projectId, userId, projectsRepository, next);
			if (!project) {
				return;
			}

			const { labels: prevLabels } = project;
			let updatedLabelsList;
			try {
				updatedLabelsList = prevLabels.map((labelItem) => {
					if (labelItem.text === label.text && labelItem.id !== label.id) {
						throw new Error();
					}

					if (labelItem.id === label.id) {
						return { ...labelItem, ...label };
					}

					return labelItem;
				});
			} catch (error) {
				next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
				return;
			}

			const dataToUpdate = { ...project, labels: updatedLabelsList };
			const updatedProject = await projectsRepository.updateOne(dataToUpdate);
			res.status(200).send(updatedProject);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
		}
	};

	deleteLabel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const projectsRepository = getCustomRepository(ProjectsRepository);
		const { projectId, labelId } = req.body;
		const { id: userId } = req.user;

		try {
			const project = await this.getProjectById(projectId, userId, projectsRepository, next);
			if (!project) {
				return;
			}

			const { labels: prevLabels } = project;
			const updatedLabelsList = prevLabels.filter((label) => label.id !== labelId);
			const dataToUpdate = { ...project, labels: updatedLabelsList };
			const updatedProject = await projectsRepository.updateOne(dataToUpdate);
			res.status(200).send(updatedProject);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, error.message));
		}
	};

	protected validateLabelData = async (label: ProjectLabel, next: NextFunction): Promise<boolean> => {
		const validationErrors = await validateLabel(label);
		if (validationErrors.length > 0) {
			next(new ErrorResponse(HttpStatusCode.UNPROCESSABLE_ENTITY, projectsErrorMessages.INVALID_DATA));
			return false;
		}
		return true;
	};

	protected getProjectById = async (
		projectId: string,
		userId: string,
		projectsRepository: ProjectsRepository,
		next: NextFunction,
	): Promise<Projects | null> => {
		const project = await projectsRepository.getOneProject(projectId, userId);

		if (project === undefined) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, projectsErrorMessages.PROJECT_NOT_FOUND));
			return null;
		}

		return project;
	};
}

export default ProjectsController;
