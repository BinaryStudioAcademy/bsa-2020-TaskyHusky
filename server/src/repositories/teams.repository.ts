import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entity/Team';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
	findAll() {
		return this
			.createQueryBuilder('teamRepository')
			.innerJoin('teamRepository.createdBy', 'user')
			.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.avatar', 'user.jobTitle'])
			.getMany()
	}

	findOneById(id: string) {
		return this.findOne({
			where: { id }
		});
	}

	findByName(name: string) {
		return this.findOne({ where: { name } });
	}

	async createOne(data: Team) {
		const entity = await this.create(data);
		return this.save(entity);
	}

	async updateOneById(id: string, data: Team) {
		await this.update(id, data);
		return this.findOne(id);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
