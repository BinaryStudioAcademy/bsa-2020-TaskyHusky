import { EntityRepository, Repository } from 'typeorm';
import { Team } from '../entity/Team';

@EntityRepository(Team)
export class TeamRepository extends Repository<Team> {
	findAll() {
		return this.find();
	}

	async findOneById(id: string) {
		const team = await this.createQueryBuilder('Team')
			.leftJoinAndSelect('Team.createdBy', 'User')
			.leftJoinAndSelect('Team.users', 'Users')
			.leftJoinAndSelect('Team.projects', 'Projects')
			.select([
				'Team.id',
				'Team.name',
				'Team.color',
				'Team.description',
				'Team.links',
				'User.id',
				'User.firstName',
				'User.lastName',
				'User.email',
				'User.jobTitle',
				'User.location',
				'User.avatar',
				'User.department',
				'Users.id',
				'Users.firstName',
				'Users.lastName',
				'Users.email',
				'Users.jobTitle',
				'Users.location',
				'Users.avatar',
				'Users.department',
				'Projects.id',
				'Projects.name',
				'Projects.category',
				'Projects.key',
			])
			.where('Team.id = :id', { id })
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
		return this.findOneById(id);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
