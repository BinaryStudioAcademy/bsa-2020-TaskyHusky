import { Octokit } from '@octokit/rest';

// TODO authenticate github in web
const octokit = new Octokit({
	auth: '75cc7a622686e2095b9aead8da79867975e9d833',
	baseUrl: 'https://api.github.com',
});

export const getMessages = async (message: string, githubUrl = 'https://github.com/witcher1359/testFeature.git') => {
	const [, owner, repo] = githubUrl.match(/github\.com\/(.+)\/(.+)\.git/) || [];

	if (!owner || !repo) {
		throw new Error('Bad repository');
	}

	const data = (await octokit.paginate('GET /repos/:owner/:repo/commits', {
		owner,
		repo,
	})).filter(
		commit => commit.commit.message.toLowerCase().startsWith(`${message} `) ||
			commit.commit.message.toLowerCase() === message)
		.map(commit => ({
			hash: commit.sha,
			message: commit.commit.message,
			author: commit.commit.author.name,
			time: commit.commit.author.date,
		}));

	return data;
};
