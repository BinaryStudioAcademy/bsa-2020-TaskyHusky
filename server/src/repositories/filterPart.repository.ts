import { EntityRepository, Repository, UpdateResult, DeleteResult, InsertResult  } from 'typeorm';
import { FilterPart } from '../entity/FilterPart';

@EntityRepository(FilterPart)
export class FilterPartRepository extends Repository<FilterPart> {
	findByName(name: string) {
		return this.findOneOrFail({ where: { name } });
	}

	getAll(): Promise<FilterPart[]> {		
		return this.find();
	  }
	
	  getById(id: string) {
		return this.findOne({
		  where: {
			id
		  }
		});
	  }
	
	  createItem(data: FilterPart): Promise<InsertResult> {
		return this.insert(data);
	  }
	
	  updateById(id: string, data: FilterPart): Promise<UpdateResult> {
		return this.update(id, data);
	  }
	
	  deleteById(id: string): Promise<DeleteResult> {
		return this.delete(id);
	  }
}
