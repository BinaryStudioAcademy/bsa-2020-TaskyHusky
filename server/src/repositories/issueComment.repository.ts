import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { IssueComment } from '../entity/IssueComment';
import { PartialIssueComment } from '../models/Issue';
import { IssueRepository } from './issue.repository';
import { NotificationRepository } from './notification.repository';
import { Issue } from '../entity/Issue';

const RELS = ['creator'];

export interface CreateIssueComment {
	issue: string;
	text: string;
}

@EntityRepository(IssueComment)
export class IssueCommentRepository extends Repository<IssueComment> {
	findAllByIssueId(id: string) {
		return this.find({ where: { issue: { id } }, relations: RELS, order: { createdAt: 'ASC' } });
	}

	findOneById(id: string) {
		return this.findOne({ where: { id }, relations: RELS });
	}

	async createOne(data: CreateIssueComment) {
		const issueRepository = getCustomRepository(IssueRepository);
		const issue = await issueRepository.findOneById(data.issue);
		const notification = getCustomRepository(NotificationRepository);
		notification.notifyIssueWatchers(issue, 'commented');

		const instance = this.create({
			...data,
			issue: {
				id: data.issue,
			},
			createdAt: new Date(),
		});

		return this.save(instance);
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
