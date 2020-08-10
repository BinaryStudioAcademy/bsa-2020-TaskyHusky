import { EntityRepository, Repository, UpdateResult, DeleteResult, InsertResult } from 'typeorm';
import { FilterDefinition } from '../entity/FilterDefinition';

@EntityRepository(FilterDefinition)
export class FilterDefinitionRepository extends Repository<FilterDefinition> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}

	getAll(): Promise<FilterDefinition[]> {
		return this.find();
	}

	getById(id: string) {
		return this.findOne({
			where: {
				id,
			},
		});
	}

	createItem(data: FilterDefinition): Promise<InsertResult> {
		return this.insert(data);
	}

	updateById(id: string, data: FilterDefinition): Promise<UpdateResult> {
		return this.update(id, data);
	}

	deleteById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
