import callWebApi from 'helpers/callApi.helper';

export const fetchExample = async (exampleName: string): Promise<WebApi.Entities.Example> => {
	const res = await callWebApi({
		method: 'GET',
		endpoint: `example/text/${exampleName}`,
	});

	return (await res.json()) as WebApi.Entities.Example;
};
