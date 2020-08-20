import {Octokit} from '@octokit/rest'

// TODO authenticate github in web
const octokit=new Octokit({
	auth:'75cc7a622686e2095b9aead8da79867975e9d833',
	baseUrl: 'https://api.github.com',
})

export const getMessages =async (message: string) => {

	const { data: prDiff } = await octokit.pulls.get({
		owner: 'octokit',
		repo: 'rest.js',
		pull_number: 1278,
		mediaType: {
			format: 'diff',
		},
	});

	return prDiff;
};
