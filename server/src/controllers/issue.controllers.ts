import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { getWebError } from '../helpers/error.helper';
import { IssueRepository } from '../repositories/issue.repository';
import { UserModel } from '../models/User';
import { issueAttachmentFolder } from '../../config/aws.config';
import uploadS3 from '../services/file.service';
import Elastic from '../services/elasticsearch.service';

const elastic = new Elastic('issue');
class IssueController {
	async uploadAttachment(req: Request, res: Response) {
		const {
			file,
			query: { issueKey },
			user: { id: userId },
		} = req;

		const { originalname } = file;
		const repository = getCustomRepository(IssueRepository);

		try {
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			const awsName = `${originalname}`;
			const link = await uploadS3(`${issueAttachmentFolder}/${issueKey}/${uniqueSuffix}`, file, awsName);
			const prevIssue = await repository.findOneByKey(issueKey as string);

			const result = await repository.updateOneByKey(
				issueKey as string,
				{ attachments: [...(prevIssue.attachments ?? []), link] },
				userId,
			);

			res.status(201).send({ ...result, newLink: link });
		} catch (err) {
			res.status(400).send(getWebError(err, 400));
		}
	}

	async getAll(req: Request, res: Response) {
		const repository = getCustomRepository(IssueRepository);
		const { from, to } = req.body;

		try {
			const result = await repository.findAll();
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getFilteredIssues(req: Request, res: Response) {
		const repository = getCustomRepository(IssueRepository);
		const { filter = {}, from, to, sort, inputText } = req.body;

		try {
			const matchedIDs = await elastic.getMatchedIssueIDs(inputText);
			if (inputText) {
				filter.id = matchedIDs;
			}
			const result = await repository.getFilteredIssues(filter, Number(from), Number(to), sort);
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getById(req: Request, res: Response) {
		const { id } = req.params;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.findOneById(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async getByColumnId(req: Request, res: Response) {
		const { id } = req.params;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.findAllByColumnId(id);
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getByProjectId(req: Request, res: Response) {
		const { id } = req.params;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.findAllByProjectId(id);
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getBacklogByBoardId(req: Request, res: Response) {
		const { boardId } = req.params;
		const repository = getCustomRepository(IssueRepository);

		try {
			const issues = await repository.findAllByBoardId(boardId);
			const issuesWithoutSprint = issues.filter((issue) => !issue.sprint);

			res.send(issuesWithoutSprint);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getIssuesByBoardId(req: Request, res: Response) {
		const { boardId } = req.params;
		const repository = getCustomRepository(IssueRepository);

		try {
			const issues = await repository.findAllByBoardId(boardId);

			res.send(issues);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getByKey(req: Request, res: Response) {
		const { key } = req.params;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.findOneByKey(key);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async watch(req: Request, res: Response) {
		const { id } = req.params;
		const { id: userId } = req.user;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.watch(id, userId);
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async create(req: Request, res: Response) {
		const { body: data } = req;
		const repository = getCustomRepository(IssueRepository);

		try {
			const issue = await repository.createOne({
				...data,
				creator: (req.user as UserModel).id,
			});
			await elastic.addData(issue);
			res.status(201).send(issue);
		} catch (err) {
			res.status(422).send(getWebError(err, 422));
		}
	}

	async reindex(req: Request, res: Response) {
		const {
			body: { newIndex, newColumn },
			params: { key },
		} = req;

		const repository = getCustomRepository(IssueRepository);

		try {
			await repository.reindex(key, newIndex, newColumn);
			res.send();
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async update(req: Request, res: Response) {
		const {
			params: { id },
			user: { id: userId },
		} = req;

		const { body: data } = req;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.updateOneById(id, data, userId);

			await elastic.update(result);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async updateByKey(req: Request, res: Response) {
		const {
			params: { key },
			user: { id: userId },
		} = req;

		const { body: data } = req;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.updateOneByKey(key, data, userId);
			await elastic.update(result);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async delete(req: Request, res: Response) {
		const {
			params: { id },
			user: { id: userId },
		} = req;

		const repository = getCustomRepository(IssueRepository);

		try {
			await elastic.delete(id);
			const result = await repository.deleteOneById(id, userId);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}
}

export default IssueController;
