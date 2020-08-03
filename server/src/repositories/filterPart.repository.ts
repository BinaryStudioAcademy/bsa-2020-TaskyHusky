import { EntityRepository, Repository, UpdateResult, DeleteResult, InsertResult  } from 'typeorm';
import BaseRepository from './base.repository';
import { FilterPart } from '../entity/FilterPart';

@EntityRepository(FilterPart)
export class FilterPartRepository extends BaseRepository<FilterPart> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}
}
