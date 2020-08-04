import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/User';
import { IUser } from '../../interfaces/User';
import { apiErrorMessages } from '../constants/api.constants';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	getById(id: string) {
		return this.findOneOrFail({ where: { id } });
	}

	getByEmail(email: string) {
		return this.findOne({ where: { email } });
	}

	createNew(data: IUser) {
		const user = this.create(data);
		this.save(user);
		return user;
	}

	async updateById(id: string, user: IUser): Promise<any> {
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
