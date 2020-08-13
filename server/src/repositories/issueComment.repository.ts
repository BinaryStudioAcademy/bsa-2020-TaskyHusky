import { EntityRepository, Repository } from 'typeorm';
import { IssueComment } from '../entity/IssueComment';

@EntityRepository(IssueComment)
export class IssueCommentRepository extends Repository<IssueComment> {
	findAllByIssueId(id: string) {
		return this.find({ where: { issue: { id } } });
	}

	findOneById(id: string) {
		return this.findOne({ where: { id } });
	}

	createOne(data: IssueComment) {
		const instance = this.create(data);
		return this.save(instance);
	}

	updateOne(id: string, data: Partial<IssueComment>) {
		return this.update({ id }, data);
	}

	deleteOne(id: string) {
		return this.delete({ id });
	}
}
