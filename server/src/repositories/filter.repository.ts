import { EntityRepository, Repository, DeleteResult } from 'typeorm';
import { Filter } from '../entity/Filter';

@EntityRepository(Filter)
export class FilterRepository extends Repository<Filter> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}

	getAll(): Promise<Filter[]> {
		return this.find({ relations: ['staredBy', 'owner'] });
	}

	getById(id: string) {
		return this.findOne({
			where: {
				id,
			},
		});
	}

	createItem(data: Filter): Promise<Filter> {
		return this.save(data);
	}

	updateItem(data: Filter): Promise<Filter> {
		return this.save(data);
	}

	deleteById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	}
}
