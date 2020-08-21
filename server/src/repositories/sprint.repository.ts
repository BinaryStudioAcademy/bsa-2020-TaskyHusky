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

	async updateOneById(id: string, data: Sprint): Promise<Sprint> {
		const updateResult: UpdateResult = await this.update(id, data);

		if (updateResult.affected === 0) {
			throw new Error(`There is no sprint with such ID - ${id}`);
		}

		return this.findOneById(id);
	}

	async deleteOneById(id: string): Promise<Sprint> {
		const deletedSprint = this.findOneById(id);
		const deleteResult: DeleteResult = await this.delete(id);
		if (deleteResult.affected === 0) {
			throw new Error(`There is no sprint with such ID - ${id}`);
		}
		return deletedSprint;
	}
}
