import callWebApi from 'helpers/callApi.helper';

export const fetchFilters = async (): Promise<WebApi.Entities.Filter[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'filter/',
	});

	return (await res.json()) as WebApi.Entities.Filter[];
};

export const fetchFilterParts = async (): Promise<WebApi.Entities.Filter[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'filter/part',
	});

	return (await res.json()) as WebApi.Entities.FilterPart[];
};

export const fetchFilterDefs = async (): Promise<WebApi.Entities.Filter[]> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: 'filter/definition',
	});

	return (await res.json()) as WebApi.Entities.FilterDefinition[];
};
