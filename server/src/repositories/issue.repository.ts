import { EntityRepository, Repository, Like } from 'typeorm';
import { Issue } from '../entity/Issue';

const RELS = ['priority', 'type'];

@EntityRepository(Issue)
export class IssueRepository extends Repository<Issue> {
	findAll() {
		return this.find({ relations: RELS });
	}

	findAllByColumnId(id: string) {
		return this.find({ relations: RELS, where: { boardColumn: { id } } });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	findOneByKey(key: string) {
		return this.findOneOrFail({ where: { issueKey: key }, relations: RELS });
	}

	createOne(data: Issue) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOneById(id: string, data: Issue) {
		return this.update(id, data);
	}

	updateOneByKey(key: string, data: Issue) {
		return this.update({ issueKey: key }, data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
