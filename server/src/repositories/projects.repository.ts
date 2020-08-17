import { EntityRepository, Repository } from 'typeorm';
import { Projects } from '../entity/Projects';

const RELS = ['boards'];

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	findAll() {
		return this.find({ relations: RELS });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	createOne(data: Projects) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOne(data: Projects) {
		return this.save(data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}

	getKeys() {
		return this.find({ select: ['key'] });
	}
}
