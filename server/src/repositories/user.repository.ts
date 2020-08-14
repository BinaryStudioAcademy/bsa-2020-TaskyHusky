import { EntityRepository, Repository, Between } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';

const expirationTime = 1000 * 60 * 60 * 24;
@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
	getById(id: string): Promise<any> {
		return this.findOne({ where: { id } });
	}

	getByEmail(email: string): Promise<any> {
		return this.findOne({ where: { email } });
	}

	getByToken(token: string): Promise<any> {
		return this.findOne({where:{
				resetPasswordToken:token,
				resetPasswordExpires:Between(new Date(), new Date(Date.now()+expirationTime))
			}})
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

	findAll() {
		return this.find();
	}
}
