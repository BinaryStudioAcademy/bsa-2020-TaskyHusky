import { validate, ValidationError } from 'class-validator';
import { Projects } from '../src/entity/Projects';

interface ProjectValidationTemplate {
	description: string;
	icon: string;
	url: string;
}

const projectValidationTemplate: ProjectValidationTemplate = {
	description: '',
	icon: '',
	url: '',
};

export const validateProject = async (data: Projects): Promise<ValidationError[]> => {
	const projectInstance = new Projects();
	const project = Object.assign(projectInstance, projectValidationTemplate, data);

	const validationErrors: ValidationError[] = await validate(project);
	return validationErrors;
};
