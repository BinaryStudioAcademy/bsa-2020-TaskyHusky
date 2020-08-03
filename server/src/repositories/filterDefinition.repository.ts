import { EntityRepository, Repository, UpdateResult, DeleteResult, InsertResult  } from 'typeorm';
import BaseRepository from './base.repository';
import { FilterDefinition } from '../entity/FilterDefinition';

@EntityRepository(FilterDefinition)
export class FilterDefinitionRepository extends BaseRepository<FilterDefinition> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}
}
