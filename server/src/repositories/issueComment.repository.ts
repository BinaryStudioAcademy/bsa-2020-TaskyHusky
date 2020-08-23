import { EntityRepository, Repository } from 'typeorm';
import { IssueComment } from '../entity/IssueComment';
import { PartialIssueComment } from '../models/Issue';
import issueHandler from '../socketConnectionHandlers/issue.handler';
import { IssueActions } from '../models/IO';

const RELS = ['creator'];

@EntityRepository(IssueComment)
export class IssueCommentRepository extends Repository<IssueComment> {
	findAllByIssueId(id: string) {
		return this.find({ where: { issue: { id } }, relations: RELS, order: { createdAt: 'ASC' } });
	}

	findOneById(id: string) {
		return this.findOne({ where: { id }, relations: RELS });
	}

	async createOne(data: IssueComment) {
		const instance = this.create({
			...data,
			createdAt: new Date(),
		});

		const result = await this.save(instance);
		const newComment = await this.findOneById(result.id);
		issueHandler.emit(IssueActions.CommentIssue, data.issue, newComment);

		return result;
	}

	updateOne(id: string, data: PartialIssueComment) {
		return this.update(
			{ id },
			{
				...data,
				editedAt: new Date(),
			},
		);
	}

	deleteOne(id: string) {
		return this.delete({ id });
	}
}
