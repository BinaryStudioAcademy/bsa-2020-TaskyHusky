import { EntityRepository, Repository, In, getRepository } from 'typeorm';
import { Projects } from '../entity/Projects';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	getOne(id: string): Promise<Projects | undefined> {
		return this.findOne(id, { relations: ['users', 'lead'] });
	}

	getOneByKey(key: string): Promise<Projects | undefined> {
		return this.findOne({ key }, { withDeleted: true });
	}

	getAll(id: string): Promise<Projects[]> {
		return getRepository(Projects)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.users', 'users')
			.where('users.id = :id', { id })
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
