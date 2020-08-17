import { EntityRepository, Repository, Between, getCustomRepository, ReplSet } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';
import { expirationTime } from '../constants/resetPassword.constants';
import { Team } from '../entity/Team';
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

	async getTeammatesById(id: string): Promise<any> {
		const teamRepository = getCustomRepository(TeamRepository);
		const user = await this.getById(id);
		const teams: Team[] = await teamRepository.find({ relations: ['users'] });

		if (!teams) {
			return [];
		}

		return teams
			.filter((team) => (team.users ?? []).map((userToSerialize) => userToSerialize.id).includes(user.id))
			.map((team) => team.users)
			.reduce((u0, u1) => (u0 ?? []).concat(u1 ?? []), []);
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

	deleteById(id: string) {
		return this.delete(id);
	}

	findAll() {
		return this.find();
	}
}
