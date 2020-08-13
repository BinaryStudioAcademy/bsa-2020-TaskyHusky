import callWebApi from 'helpers/callApi.helper';
import { InitialFilter } from './../containers/SaveFilterModal/logic/actionTypes';

export const fetchFilters = async (): Promise<WebApi.Entities.Filter[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'filter/',
	});

	return (await res.json()) as WebApi.Entities.Filter[];
};

export const fetchFilterParts = async (): Promise<WebApi.Entities.FilterPart[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'filter/part',
	});

	return (await res.json()) as WebApi.Entities.FilterPart[];
};

export const fetchFilterDefs = async (): Promise<WebApi.Entities.FilterDefinition[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'filter/definition',
	});

	return (await res.json()) as WebApi.Entities.FilterDefinition[];
};

export const updateFilter = async (data: WebApi.Entities.Filter): Promise<WebApi.Entities.Filter> => {
	const res = await callWebApi({
		method: 'PUT',
		endpoint: 'filter/',
		body: {
			...data,
		},
	});

	return (await res.json()) as WebApi.Entities.Filter;
};

export const updateFilterPart = async (data: WebApi.Entities.FilterPart): Promise<WebApi.Entities.FilterPart> => {
	const res = await callWebApi({
		method: 'PUT',
		endpoint: 'filter/part',
		body: {
			...data,
		},
	});

	return (await res.json()) as WebApi.Entities.FilterPart;
};

export const saveFilter = async (data: InitialFilter): Promise<WebApi.Entities.Filter> => {
	const res = await callWebApi({
		method: 'POST',
		endpoint: 'filter/',
		body: {
			...data,
		},
	});

	return (await res.json()) as WebApi.Entities.Filter;
};
