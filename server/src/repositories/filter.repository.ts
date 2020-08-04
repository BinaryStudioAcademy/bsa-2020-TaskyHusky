import { EntityRepository, Repository, UpdateResult, DeleteResult, InsertResult  } from 'typeorm';
import { Filter } from '../entity/Filter';

@EntityRepository(Filter)
export class FilterRepository extends Repository<Filter>  {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}

	getAll(): Promise<Filter[]> {
		return this.find();
	  }
	
	  getById(id: string) {
		return this.findOne({
		  where: {
			id
		  }
		});
	  }
	
	  createItem(data: Filter): Promise<InsertResult> {
		return this.insert(data);
	  }
	
	  updateById(id: string, data: Filter): Promise<UpdateResult> {
		return this.update(id, data);
	  }
	
	  deleteById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	  }
}
