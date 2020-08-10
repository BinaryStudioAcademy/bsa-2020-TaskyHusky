import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { Teams } from '../entity/Teams';

@EntityRepository(Teams)
export class TeamsRepository extends Repository<Teams> {
	findAll() {
		return this.find();
	}

	findOneById(id: string) {
		return this.findOne({
			where: { id }
		});
	}

	createOne(data: Teams) {
		const entity = this.create(data);
		return this.save(entity);
	}

	async updateOneById(id: string, data: any) {
		await this.update(id, data);
		return this.findOne(id);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
