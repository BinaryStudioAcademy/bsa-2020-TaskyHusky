import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';
import { UserModel } from '../models/User';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
	async getById(id: string): Promise<any> {
		return await this.findOne({ where: { id } });
	}

	async getByEmail(email: string): Promise<any> {
		return await this.findOne({ where: { email } });
	}

	createNew(data: UserModel) {
		const user = this.create(data);
		return this.save(user);
	}

	async updateById(id: string, user: UserModel): Promise<any> {
		this.update(id, user);

		return this.findOne(id);
	}

	deleteById(id: string) {
		return this.delete(id);
	}
}
