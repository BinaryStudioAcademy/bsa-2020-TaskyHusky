import { EntityRepository, Repository, In, getRepository } from 'typeorm';
import { Projects } from '../entity/Projects';

const RELS = ['boards'];

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	findAll() {
		return this.find({ relations: RELS });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	getOne(id: string): Promise<Projects | undefined> {
		return this.findOne(id, { relations: ['creator', 'lead', 'boards'] });
	}

	getOneByIdWithLead(id: string): Promise<Projects | undefined> {
		return this.findOne({ id }, { relations: ['lead', 'users'] });
	}

	getOneByKey(key: string): Promise<Projects | undefined> {
		return this.findOne({ key }, { withDeleted: true });
	}

	findAllProjectsWithCreatorsId(id: string) {
		return getRepository(Projects)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.users', 'users')
			.where('users.id = :id', { id })
			.loadAllRelationIds()
			.getMany();
	}

	createOne(data: Projects) {
		const entity = this.create(data);
		return this.save(entity);
	}

	updateOne(data: Projects) {
		return this.save(data);
	}

	deleteOneById(id: string) {
		return this.softDelete(id);
	}
}
