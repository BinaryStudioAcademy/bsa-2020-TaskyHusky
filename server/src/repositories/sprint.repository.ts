import { EntityRepository, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Sprint } from '../entity/Sprint';

@EntityRepository(Sprint)
export class SprintRepository extends Repository<Sprint> {
	findAll(): Promise<Sprint[]> {
		return this.find({ loadRelationIds: true });
	}

	async findOneById(id: string): Promise<Sprint> {
		return this.findOneOrFail(id, { loadEagerRelations: true });
	}

	async createOne(data: Sprint): Promise<Sprint> {
		const entity: Sprint = this.create(data);
		return this.save(entity);
	}

	async updateOneById(id: string, data: Sprint): Promise<UpdateResult> {
		return this.update(id, data);
	}

	async deleteOneById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
