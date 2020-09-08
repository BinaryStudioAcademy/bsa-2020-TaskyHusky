import fetch from 'node-fetch';

// TODO authenticate github in web

export const getMessages = async (message: string, githubUrl = 'https://github.com/witcher1359/testFeature.git') => {
	const [, owner, repo] = githubUrl.match(/github\.com\/(.+)\/(.+)\.git/) || [];

	if (!owner || !repo) {
		throw new Error('Bad repository');
	}

	const data = fetch(`https://api.github.com/repos/${owner}/${repo}/commits`)
		.then((res) => res.json())
		.then((commits) =>
			commits.filter((commit: any) => commit.commit.message.toLowerCase().startsWith(`${message}`)),
		)
		.catch((error) => console.log(error));

	// const data = (
	// 	await octokit.paginate('GET /repos/:owner/:repo/commits', {
	// 		owner,
	// 		repo,
	// 	})
	// )
	// 	.filter(
	// 		(commit) =>
	// 			commit.commit.message.toLowerCase().startsWith(`${message} `) ||
	// 			commit.commit.message.toLowerCase() === message,
	// 	)
	// 	.map(async (commit) => {
	// 		const filesToReturn = (<Array<Record<string, any>>>await octokit.paginate(
	// 			'GET /repos/:owner/:repo/commits/:ref',
	// 			{
	// 				owner,
	// 				repo,
	// 				ref: commit.sha,
	// 			},
	// 		)).map((foundedCommit) => {
	// 			return foundedCommit.files.map((file: { sha: any; additions: any; deletions: any; filename: any }) => ({
	// 				sha: file.sha,
	// 				additions: file.additions,
	// 				deletions: file.deletions,
	// 				filename: file.filename,
	// 			}));
	// 		})[0];

	// 		return {
	// 			hash: commit.sha,
	// 			message: commit.commit.message,
	// 			author: commit.commit.author.name,
	// 			avatar: commit.author.avatar_url,
	// 			time: commit.commit.author.date,
	// 			files: filesToReturn,
	// 		};
	// 	});

	return data;
};
