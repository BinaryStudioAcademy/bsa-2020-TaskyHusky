import { validate, ValidationError } from 'class-validator';
import { ProjectLabel } from '../src/entity/ProjectLabel';

export const validateLabel = async (data: ProjectLabel): Promise<ValidationError[]> => {
	const labelInstance = new ProjectLabel();
	const label = Object.assign(labelInstance, data);

	const validationErrors: ValidationError[] = await validate(label);
	return validationErrors;
};
