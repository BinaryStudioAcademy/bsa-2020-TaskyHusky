import { EntityRepository, Repository } from 'typeorm';
import { Projects } from '../entity/Projects';

const RELS = ['boards'];

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	findAll() {
		return this.find({ relations: RELS });
	}

	getOne(id: string) {
		return this.findOneOrFail(id, { relations: ['creator', 'lead', 'boards'] });
	}

	getOneProject(id: string, prop: string) {
		return this.findOne({ [prop]: id });
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
}
