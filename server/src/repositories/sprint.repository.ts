import { EntityRepository, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Sprint } from '../entity/Sprint';

@EntityRepository(Sprint)
export class SprintRepository extends Repository<Sprint> {
	findAll(): Promise<Sprint[]> {
		return this.find();
	}

	findOneById(sprintID: string): Promise<Sprint | undefined> {
		return this.findOne(sprintID);
	}

	createOne(data: Sprint): Promise<Sprint> {
		const entity: Sprint = this.create(data);
		return this.save(entity);
	}

	updateOneById(id: string, data: Sprint): Promise<UpdateResult> {
		return this.update(id, data);
	}

	deleteOneById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
