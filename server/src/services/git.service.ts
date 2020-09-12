import fetch from 'node-fetch';
import { CommitResult } from '../models/Result';

export const getMessages = async (key: string, githubUrl = 'https://github.com/sahanr/bsa-2020-app.git') => {
	const [, owner, repo] = githubUrl.match(/github\.com\/(.+)\/(.+)\.git/) || [];

	if (!owner || !repo) {
		return [];
	}

	const data = fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
		.then((res) => res.json())
		.then((commits) => {
			return commits
				.filter((it: any) => {
					
					const { message } = it.commit;
					return message.toLowerCase().indexOf(key.toLowerCase()) === 0;
				})
				.map((commit: any) => ({
					message: commit.commit.message,
					sha: commit.sha,
					url: commit.html_url,
					date: commit.commit.committer.date,
					repo: {
						name: repo,
						url: githubUrl.slice(0, -4),
					},
					author: {
						name: commit.commit.author.name,
						url: commit.author.html_url,
						avatar: commit.author.avatar_url,
					},
				}))
				.sort((a: CommitResult, b: CommitResult) => {
					return Number(new Date(b.date)) - Number(new Date(a.date));
				});
		})
		.catch((error) => {
			throw new Error(error);
		});

	return data;
};
