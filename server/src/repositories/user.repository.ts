import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { UserModel } from '../models/User';
import { apiErrorMessages } from '../constants/api.constants';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async getById(id: string) {
		const user = await this.findOne({ where: { id } });

		if(!user){
			throw new Error('User with current ID not found')
		}

		return user;
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
