import { DefinitionEntity } from './types';

export const definitionTypesToDropdownData = (entity: DefinitionEntity) => {
	const { id, title, color, icon } = entity;
	const data = {
		value: title,
		key: id,
		text: title,
		icon,
		color,
	};
	return data;
};
