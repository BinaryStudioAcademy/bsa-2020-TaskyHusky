import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { ErrorResponse } from '../helpers/errorHandler.helper';
import HttpStatusCode from '../constants/httpStattusCode.constants';
import { getMessages } from '../services/git.service';
import { IssueRepository } from '../repositories/issue.repository';

class GitController {
	getCommits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		const { id } = req.params;
		const repository = getCustomRepository(IssueRepository);
		try {
			const issue = await repository.findOneById(id);
			const { issueKey } = issue;
			if (!issueKey) {
				throw new Error('Could not find such issue');
			}
			const commits = await getMessages(issueKey);

			res.send(commits);
		} catch (error) {
			next(new ErrorResponse(HttpStatusCode.NOT_FOUND, error.message));
		}
	};
}

export default GitController;
