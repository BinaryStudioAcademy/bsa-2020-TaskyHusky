import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entity/Team';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
	findAll() {
		return this.find();
	}

	findOneById(projectID: string) {
		return this.findOne(projectID);
	}

	createOne(data: Team) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOneById(id: string, data: Team) {
		this.update(id, data);
		return this.findOne(id);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
