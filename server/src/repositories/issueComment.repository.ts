import { EntityRepository, Repository } from 'typeorm';
import { IssueComment } from '../entity/IssueComment';
import { PartialIssueComment } from '../models/Issue';
import issueHandler from '../socketConnectionHandlers/issue.handler';
import { IssueActions } from '../models/IO';

const RELS = ['creator'];
const ID_RELS = ['issue'];

@EntityRepository(IssueComment)
export class IssueCommentRepository extends Repository<IssueComment> {
	findAllByIssueId(id: string) {
		return this.find({
			where: { issue: { id } },
			relations: RELS,
			loadRelationIds: {
				relations: ID_RELS,
			},
			order: { createdAt: 'ASC' },
		});
	}

	findOneById(id: string) {
		return this.findOneOrFail({
			where: { id },
			relations: RELS,
			loadRelationIds: {
				relations: ID_RELS,
			},
		});
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

	async updateOne(id: string, data: PartialIssueComment) {
		const result = await this.update(
			{ id },
			{
				...data,
				editedAt: new Date(),
			},
		);

		const newComment = await this.findOneById(id);
		issueHandler.emit(IssueActions.UpdateIssueComment, newComment.issue, id, newComment);

		return result;
	}

	deleteOne(id: string) {
		return this.delete({ id });
	}
}
