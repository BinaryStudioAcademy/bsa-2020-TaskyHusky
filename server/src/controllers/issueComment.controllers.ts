import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { getWebError } from '../helpers/error.helper';
import { IssueCommentRepository } from '../repositories/issueComment.repository';
import { parseMentionsXMLAndSendEmails } from '../helpers/parseXML.helper';
import { IssueRepository } from '../repositories/issue.repository';

export class IssueCommentController {
	async getAllByIssueId(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);
		const { id } = req.params;

		try {
			const result = await repository.findAllByIssueId(id);
			res.send(result);
		} catch (err) {
			res.send(getWebError(err, 500));
		}
	}

	async getOneById(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);
		const { id } = req.params;

		try {
			const result = await repository.findOneById(id);
			res.send(result);
		} catch (err) {
			res.send(getWebError(err, 404));
		}
	}

	async createOne(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);
		const issueRepository = getCustomRepository(IssueRepository);
		const { body: data } = req;
		const issue = await issueRepository.findOneById(data.issue);
		parseMentionsXMLAndSendEmails(data.text, issue.issueKey as string);

		try {
			const result = await repository.createOne({
				...data,
				creator: req.user.id,
			});

			res.send(result);
		} catch (err) {
			res.send(getWebError(err, 422));
		}
	}

	async updateOne(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);

		const {
			body: data,
			params: { id },
		} = req;

		try {
			const result = await repository.updateOne(id, data);
			res.send(result);
		} catch (err) {
			res.send(getWebError(err, 404));
		}
	}

	async deleteOne(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);
		const { id } = req.params;

		try {
			const result = await repository.deleteOne(id);
			res.send(result);
		} catch (err) {
			res.send(getWebError(err, 404));
		}
	}
}
