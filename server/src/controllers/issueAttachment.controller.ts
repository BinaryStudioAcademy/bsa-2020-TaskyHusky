import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { IssueAttachmentRepository } from '../repositories/issueAttachmentRepository';
import { getWebError } from '../helpers/error.helper';
import uploadS3 from '../services/file.service';
import { issueAttachmentFolder } from '../../config/aws.config';

export class IssueAttachmentController {
	async getAll(req: Request, res: Response) {
		const repository = getCustomRepository(IssueAttachmentRepository);
		const {
			params: { id },
		} = req;

		try {
			const result = await repository.findAllByIssueId(id);
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getById(req: Request, res: Response) {
		const repository = getCustomRepository(IssueAttachmentRepository);
		const {
			params: { id },
		} = req;

		try {
			const result = await repository.findOneById(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async createOne(req: Request, res: Response) {
		const repository = getCustomRepository(IssueAttachmentRepository);
		const { file } = req;
		const { originalname } = file;

		try {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			const awsName = `${originalname}_${uniqueSuffix}`;
			const link = 'https://example.com'; //await uploadS3(issueAttachmentFolder, file, name);
			const result = await repository.createOne({ name: originalname, link });
			res.status(201).send(result);
		} catch (err) {
			res.status(422).send(getWebError(err, 422));
		}
	}

	async updateOne(req: Request, res: Response) {
		const repository = getCustomRepository(IssueAttachmentRepository);
		const {
			params: { id },
			body: data,
		} = req;

		try {
			const result = await repository.updateOneById(id, data);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async deleteOne(req: Request, res: Response) {
		const repository = getCustomRepository(IssueAttachmentRepository);
		const {
			params: { id },
		} = req;

		try {
			const result = await repository.deleteOne(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}
}
