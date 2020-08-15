import { DefinitionEntity } from './types';
import { DropdownOption } from '../types';

export const definitionTypesToDropdownData = (entity: DefinitionEntity): DropdownOption => {
	const { id, title, color, icon } = entity;
	const data = {
		value: id,
		key: id,
		text: title,
		icon,
		color,
	};
	return data;
};
