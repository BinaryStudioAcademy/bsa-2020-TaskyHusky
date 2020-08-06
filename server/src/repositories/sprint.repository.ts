import { EntityRepository, Repository, DeleteResult } from 'typeorm';
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

	updateOne(data: Sprint): Promise<Sprint> {
		return this.save(data);
	}

	deleteOneById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
