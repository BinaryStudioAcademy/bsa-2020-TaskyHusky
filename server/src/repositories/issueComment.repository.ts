import { EntityRepository, Repository } from 'typeorm';
import { IssueComment } from '../entity/IssueComment';
import { PartialIssueComment } from '../models/Issue';

const RELS = ['creator'];

@EntityRepository(IssueComment)
export class IssueCommentRepository extends Repository<IssueComment> {
	findAllByIssueId(id: string) {
		return this.find({ where: { issue: { id } }, relations: RELS });
	}

	findOneById(id: string) {
		return this.findOne({ where: { id }, relations: RELS });
	}

	createOne(data: IssueComment) {
		const instance = this.create({
			...data,
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
