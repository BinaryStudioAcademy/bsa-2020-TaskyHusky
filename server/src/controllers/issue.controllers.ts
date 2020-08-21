import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { getWebError } from '../helpers/error.helper';
import { IssueRepository } from '../repositories/issue.repository';

class IssueController {
	async getAll(req: Request, res: Response) {
		const repository = getCustomRepository(IssueRepository);
		const { from, to } = req.body;
		try {
			const result = await repository.findAll(Number(from), Number(to));
			res.send(result);
		} catch (err) {
			res.status(500).send(getWebError(err, 500));
		}
	}

	async getFilteredIssues(req: Request, res: Response) {
		const repository = getCustomRepository(IssueRepository);
		const { filter, from, to, sort } = req.body;

		try {
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

	async create(req: Request, res: Response) {
		const { body: data } = req;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.createOne({
				...data,
				creator: req.user.id,
			});

			res.status(201).send(result);
		} catch (err) {
			res.status(422).send(getWebError(err, 422));
		}
	}

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { body: data } = req;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.updateOneById(id, data);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async updateByKey(req: Request, res: Response) {
		const { key } = req.params;
		const { body: data } = req;

		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.updateOneByKey(key, data);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const repository = getCustomRepository(IssueRepository);

		try {
			const result = await repository.deleteOneById(id);
			res.send(result);
		} catch (err) {
			res.status(404).send(getWebError(err, 404));
		}
	}
}

export default IssueController;
