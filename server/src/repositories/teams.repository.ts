import { EntityRepository, Repository } from 'typeorm';
import { Teams } from '../entity/Teams';

@EntityRepository(Teams)
export class TeamsRepository extends Repository<Teams> {
	findAll() {
		return this.find();
	}

	findOneById(projectID: string) {
		return this.findOne(projectID);
	}

	createOne(data: Teams) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOneById(id: string, data: Teams) {
		this.update(id, data);
		return this.findOne(id);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
