import { EntityRepository, Repository } from 'typeorm';

import { Projects } from '../entity/Projects';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	findAll() {
		return this.find();
	}

	findOneById(projectID: string) {
		return this.findOneOrFail(projectID);
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
