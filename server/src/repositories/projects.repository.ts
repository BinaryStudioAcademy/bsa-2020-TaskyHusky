import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Projects } from '../entity/Projects';
import { UserRepository } from './user.repository';

const RELS = ['boards'];

@EntityRepository(Projects)
export class ProjectsRepository extends Repository<Projects> {
	findAll() {
		return this.find({ relations: RELS });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, relations: RELS });
	}

	async createOne(data: Projects, userId: string): Promise<any> {
		const userRepository = getCustomRepository(UserRepository);

		const userToAdd = await userRepository.getById(userId);
		if (!userToAdd) throw new Error('User with current ID not found');

		const entity = this.create({ ...data, creator: userToAdd });
		return this.save(entity);
	}

	updateOne(data: Projects) {
		return this.save(data);
	}

	deleteOneById(id: string) {
		return this.delete(id);
	}
}
