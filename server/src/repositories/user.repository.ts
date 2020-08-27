import { EntityRepository, Repository, Between, getCustomRepository } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';
import { expirationTime } from '../constants/resetPassword.constants';
import { TeamRepository } from './teams.repository';
@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
	getAll() {
		return this.findAll();
	}

	async getById(id: string): Promise<any> {
		const user = await this.findOne({ where: { id } });
		if (!user) {
			throw new Error('Can not find user');
		}
		const { password, ...rest } = user;
		return rest;
	}

	async getProjects(id: string): Promise<any> {
		const user = await this.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.leftJoinAndSelect('user.projects', 'project')
			.getOne();

		if (!user) {
			throw new Error('User with such id does not exist');
		}

		return user.projects;
	}

	async getTeams(id: string): Promise<any> {
		const user = await this.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.leftJoinAndSelect('user.teams', 'team')
			.getOne();

		if (!user) {
			throw new Error('User with such id does not exist');
		}

		return user.teams;
	}

	getByEmail(email: string): Promise<any> {
		return this.findOne({ where: { email } });
	}

	getByToken(token: string): Promise<any> {
		return this.findOne({
			where: {
				resetPasswordToken: token,
				resetPasswordExpires: Between(new Date(), new Date(Date.now() + expirationTime)),
			},
		});
	}

	async createNew(data: UserProfile): Promise<any> {
		const user = this.create(data);
		const newUser = await this.save(user);
		if (!newUser) {
			throw new Error('Can not save user');
		}
		const { password, ...rest } = newUser;
		return rest;
	}

	async updateById(id: string, user: Partial<UserProfile>): Promise<any> {
		this.update(id, user);
		const updatedUser = await this.findOne(id);
		if (!updatedUser) {
			throw new Error('Can not find user');
		}
		const { password, ...rest } = updatedUser;
		return rest;
	}

	async deleteById(id: string): Promise<any> {
		const user = await this.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.leftJoinAndSelect('user.teamsOwner', 'team')
			.getOne();
		const teamRepository = getCustomRepository(TeamRepository);
		user?.teamsOwner?.map((item) => {
			teamRepository.deleteOneById(item.id);
		});
		return this.delete(id);
	}

	findAll() {
		return this.find();
	}
}
