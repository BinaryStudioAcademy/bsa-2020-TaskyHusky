import { v4 } from 'uuid';
import { EntityRepository, Repository, DeleteResult, getRepository } from 'typeorm';
import { Filter } from '../entity/Filter';

@EntityRepository(Filter)
export class FilterRepository extends Repository<Filter> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}

	getAll(): Promise<Filter[]> {
		return this.find({ relations: ['owner', 'staredBy', 'filterParts'] });
	}

	async getById(id: string) {
		return this.findOne({
			relations: ['owner', 'filterParts', 'filterParts.filterDef'],
			where: {
				id,
			},
		});
	}

	async createItem(data: Filter): Promise<Filter> {
		const { name, filterParts, owner } = data;

		const filter = await this.save({ name, owner });
		if (filterParts) {
			filter.filterParts = filterParts.map((filterPart) => ({ ...filterPart, id: v4() }));
		}

		return this.save(filter);
	}

	async updateItem(data: Filter): Promise<Filter> {
		return this.save(data);
	}

	deleteById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
