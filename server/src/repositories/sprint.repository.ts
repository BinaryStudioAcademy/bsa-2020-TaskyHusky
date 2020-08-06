import { EntityRepository, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Sprint } from '../entity/Sprint';

@EntityRepository(Sprint)
export class SprintRepository extends Repository<Sprint> {
	async findAll(): Promise<Sprint[]> {
		return this.find();
	}

	async findOneById(id: string): Promise<Sprint | undefined> {
		return this.findOneOrFail(id);
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
