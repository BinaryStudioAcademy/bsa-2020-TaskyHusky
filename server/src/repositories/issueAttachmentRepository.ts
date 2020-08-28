import { EntityRepository, Repository } from 'typeorm';
import { IssueAttachment } from '../entity/IssueAttachment';

interface CreateIssueAttachment {
	name: string;
	link: string;
	issue?: { id: string };
}

interface UpdateIssueAttachment extends Partial<CreateIssueAttachment> {}

@EntityRepository(IssueAttachment)
export class IssueAttachmentRepository extends Repository<IssueAttachment> {
	findAllByIssueId(id: string) {
		return this.find({ where: { issue: { id } } });
	}

	findOneById(id: string) {
		return this.findOne({ where: { id } });
	}

	createOne(data: CreateIssueAttachment) {
		const instance = this.create(data);
		return this.save(instance);
	}

	updateOneById(id: string, data: UpdateIssueAttachment) {
		return this.update({ id }, data);
	}

	deleteOne(id: string) {
		return this.delete({ id });
	}
}
