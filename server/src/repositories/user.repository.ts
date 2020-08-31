import { EntityRepository, Repository, Between, getCustomRepository } from 'typeorm';
import { expirationTime } from '../constants/resetPassword.constants';
import { TeamRepository } from './teams.repository';
import { UserProfile } from '../entity/UserProfile';
import { Projects } from '../entity/Projects';
import { Team } from '../entity/Team';
import { Issue } from '../entity/Issue';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
	getAll() {
		return this.findAll();
	}

	async getById(id: string) {
		const user = await this.findOne({ where: { id } });
		if (!user) {
			throw new Error('Can not find user');
		}
		const { password, ...rest } = user;
		return rest;
	}

	async getProjects(id: string): Promise<Projects[] | undefined> {
		const user = await this.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.leftJoin('user.projects', 'project')
			.addSelect(['project.id', 'project.name', 'project.category'])
			.getOne();

		if (!user) {
			throw new Error('User with such id does not exist');
		}

		return user.projects;
	}

	async getTeams(id: string): Promise<Team[] | undefined> {
		const user = await this.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.leftJoin('user.teams', 'team')
			.addSelect(['team.id', 'team.name', 'team.color'])
			.leftJoin('team.users', 'teams_people')
			.addSelect('teams_people.id')
			.getOne();

		if (!user) {
			throw new Error('User with such id does not exist');
		}

		return user.teams;
	}

	async getAssignedIssues(id: string): Promise<Issue[] | undefined> {
		const user = await this.createQueryBuilder('user')
			.where('user.id = :id', { id })
			.leftJoin('user.assignedIssues', 'issue')
			.addSelect(['issue.id', 'issue.issueKey', 'issue.summary'])
			.leftJoinAndSelect('issue.type', 'issueType')
			.getOne();

		if (!user) {
			throw new Error('User with such id does not exist');
		}

		return user.assignedIssues;
	}

	getByEmail(email: string): Promise<UserProfile | undefined> {
		return this.findOne({ where: { email } });
	}

	getByPassToken(token: string): Promise<UserProfile | undefined> {
		return this.findOne({
			where: {
				resetPasswordToken: token,
				resetPasswordExpires: Between(new Date(), new Date(Date.now() + expirationTime)),
			},
		});
	}

	async getByEmailToken(token: string): Promise<UserProfile | undefined> {
		return this.findOne({
			where: {
				resetEmailToken: token,
				resetEmailExpires: Between(new Date(), new Date(Date.now() + expirationTime)),
			},
		});
	}

	async createNew(data: UserProfile) {
		const user = this.create(data);
		const newUser = await this.save(user);
		if (!newUser) {
			throw new Error('Can not save user');
		}
		const { password, ...rest } = newUser;
		return rest;
	}

	async updateById(id: string, user: Partial<UserProfile>) {
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
		user?.teamsOwner?.forEach(async (item) => {
			await teamRepository.deleteOneById(item.id);
		});
		return this.delete(id);
	}

	findAll(): Promise<UserProfile[]> {
		return this.find();
	}

	async getUserTeammates(userId: string) {
		return this.findOne({
			where: { id: userId },
			relations: ['teammates'],
			select: ['id'],
		});
	}
}
