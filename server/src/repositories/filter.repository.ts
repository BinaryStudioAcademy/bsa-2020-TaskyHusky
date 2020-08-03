import { EntityRepository, Repository, UpdateResult, DeleteResult, InsertResult  } from 'typeorm';
import BaseRepository from './base.repository';
import { Filter } from '../entity/Filter';

@EntityRepository(Filter)
export class FilterRepository extends BaseRepository<Filter> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}
}
