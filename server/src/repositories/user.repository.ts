import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';
import { UserModel } from '../models/User';
import { apiErrorMessages } from '../constants/api.constants';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
	async getById(id: string): Promise<any> {
		const user = await this.findOne({ where: { id } });
		if (!user) {
			throw new Error('Can not find such user');
		}
		return user;
	}

	async getByEmail(email: string): Promise<any> {
		const user = await this.findOne({ where: { email } });
		if (!user) {
			throw new Error('Can not find user such email');
		}
		return user;
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
