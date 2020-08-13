import { IssueCommentRepository } from '../repositories/issueComment.repository';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { getWebError } from '../helpers/error.helper';

export class IssueCommentController {
	async getAllByIssueId(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);
		const { id } = req.params;

		try {
			const result = await repository.findAllByIssueId(id);
			res.send(result);
		} catch (err) {
			res.send(getWebError(err, 404));
		}
	}

	async getOneById(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);
		const { id } = req.params;

		try {
			const result = await repository.findAllByIssueId(id);
			res.send(result);
		} catch (err) {
			res.send(getWebError(err, 404));
		}
	}

	async createOne(req: Request, res: Response) {
		const repository = getCustomRepository(IssueCommentRepository);
		const { body: data } = req;

		try {
			const result = await repository.createOne(data);
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
