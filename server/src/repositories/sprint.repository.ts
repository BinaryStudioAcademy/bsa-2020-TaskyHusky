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

	async updateOneById(id: string, data: Sprint): Promise<Sprint | undefined> {
		await this.update(id, data);
		return this.findOneOrFail(id);
	}

	async deleteOneById(id: string): Promise<Sprint | undefined> {
		await this.findOneOrFail(id);
		this.delete(id);
		return this.findOneOrFail(id);
	}
}
