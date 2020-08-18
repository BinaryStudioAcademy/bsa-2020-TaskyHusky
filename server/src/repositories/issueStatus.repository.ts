import { EntityRepository, Repository } from 'typeorm';
import { IssueStatus } from '../entity/IssueStatus';

@EntityRepository(IssueStatus)
export class IssueStatusRepository extends Repository<IssueStatus> {
	findAll() {
		return this.find();
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id } });
	}

	createOne(data: IssueStatus) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOneById(id: string, data: IssueStatus) {
		return this.update(id, data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
