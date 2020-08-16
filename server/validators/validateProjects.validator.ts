import { validate, ValidationError } from 'class-validator';
import { Projects } from '../src/entity/Projects';

interface ProjectValidationTemplate {
	name: string;
	key: string;
	description: string;
	icon: string;
}

const projectValidationTemplate: ProjectValidationTemplate = {
	name: '',
	key: '',
	description: '',
	icon: '',
};

export const validateProject = async (data: Projects): Promise<ValidationError[]> => {
	const projectInstance = new Projects();
	const project = Object.assign(projectInstance, projectValidationTemplate, data);

	const validationErrors: ValidationError[] = await validate(project);
	return validationErrors;
};
