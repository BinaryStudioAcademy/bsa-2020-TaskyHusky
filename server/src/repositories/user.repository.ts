import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';
import { UserModel } from '../models/User';
import { apiErrorMessages } from '../constants/api.constants';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
	getById(id: string) {
		return this.findOne({ where: { id } });
	}

	getByEmail(email: string) {
		return this.findOne({ where: { email } });
	}

	createNew(data: UserModel) {
		const user = this.create(data);
		return this.save(user);
	}

	async updateById(id: string, user: UserModel): Promise<any> {
		const { email } = user;
		const userToChange = await this.getByEmail(email);

		if (userToChange && userToChange.id !== id) {
			throw new Error(apiErrorMessages.NOT_UNIQUE_EMAIL);
		}

		this.update(id, user);

		return this.findOne(id);
	}

	deleteById(id: string) {
		return this.delete(id);
	}
}
