import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entity/Team';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
	findAll() {
		return this.find();
	}

	async findOneById(id: string) {
		const team = await this.createQueryBuilder('Team')
			.where('Team.id = :id', { id })
			.innerJoin('Team.users', 'User')
			.addSelect([
				'User.id',
				'User.firstName',
				'User.lastName',
				'User.avatar',
				'User.email',
				'User.jobTitle',
				'User.location',
			])
			.getOne();

		return team;
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
