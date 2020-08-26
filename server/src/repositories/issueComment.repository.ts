import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { IssueComment } from '../entity/IssueComment';
import { PartialIssueComment } from '../models/Issue';
import { IssueRepository } from './issue.repository';
import { NotificationRepository } from './notification.repository';
import issueHandler from '../socketConnectionHandlers/issue.handler';
import { IssueActions } from '../models/IO';

const RELS = ['creator'];
const ID_RELS = ['issue'];

export interface CreateIssueComment {
	issue: string;
	text: string;
}

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

	async createOne(data: CreateIssueComment) {
		const issueRepository = getCustomRepository(IssueRepository);
		const issue = await issueRepository.findOneById(data.issue);
		const notification = getCustomRepository(NotificationRepository);

		const instance = this.create({
			...data,
			issue: {
				id: data.issue,
			},
			createdAt: new Date(),
		});

		const result = await this.save(instance);
		const newComment = await this.findOneById(result.id);
		issueHandler.emit(IssueActions.CommentIssue, data.issue, newComment);
		notification.notifyIssueWatchers({ issue, actionOrText: 'commented' });

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

	async deleteOne(id: string) {
		const { issue } = await this.findOneById(id);
		issueHandler.emit(IssueActions.DeleteIssueComment, issue, id);
		return await this.delete({ id });
	}
}
