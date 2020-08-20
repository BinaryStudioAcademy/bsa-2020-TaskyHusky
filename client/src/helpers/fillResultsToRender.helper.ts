import { IModifiedEntity } from '../typings/entityModifiedForSearchElement';

function fillResult<T extends { id: string }>(data: T): IModifiedEntity<T> {
	return {
		title: '',
		key: data.id,
		data,
	};
}

export function fillResultField<T extends { id: string }>(name: string, data: T[]) {
	return {
		name,
		results: data.map(fillResult),
	};
}
