import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';
import { UserModel } from '../models/User';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
	getById(id: string): Promise<any> {
		return this.findOne({ where: { id } });
	}

	getByEmail(email: string): Promise<any> {
		return this.findOne({ where: { email } });
	}

	createNew(data: UserProfile) {
		const user = this.create(data);
		return this.save(user);
	}

	async updateById(id: string, user: UserProfile): Promise<any> {
		this.update(id, user);

		return this.findOne(id);
	}

	deleteById(id: string) {
		return this.delete(id);
	}
}
