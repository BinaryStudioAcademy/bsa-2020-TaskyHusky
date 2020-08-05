import { EntityRepository, Repository } from 'typeorm';
import { Issue } from '../entity/Issue';

const RELS = ['priority', 'type'];

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
	findAll() {
		return this.find({ relations: RELS });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	createOne(data: Issue) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOneById(id: string, data: Issue) {
		return this.update(id, data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
