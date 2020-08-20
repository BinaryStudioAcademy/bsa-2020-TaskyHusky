import { EntityRepository, Repository, In, getRepository } from 'typeorm';
import { Projects } from '../entity/Projects';
import { UserRepository } from './user.repository';

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	getOne(id: string): Promise<Projects | undefined> {
		return this.findOne(id, { relations: ['users', 'lead'] });
	}

	getOneProject(id: string, userId: string): Promise<Projects | undefined> {
		return getRepository(Projects)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.lead', 'lead')
			.leftJoinAndSelect('project.users', 'users')
			.where('project.id = :id', { id })
			.andWhere('users.id = :userId', { userId })
			.getOne();
	}

	getOneByKey(key: string): Promise<Projects | undefined> {
		return this.findOne({ key }, { withDeleted: true });
	}

	getAllByUserId(id: string): Promise<Projects[]> {
		return getRepository(Projects)
			.createQueryBuilder('project')
			.leftJoinAndSelect('project.lead', 'lead')
			.leftJoin('project.users', 'users')
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

	getKeys() {
		return this.find({ select: ['key'], withDeleted: true });
	}
}
