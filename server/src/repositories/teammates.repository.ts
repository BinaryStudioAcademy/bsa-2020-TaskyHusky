import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';

@EntityRepository(UserProfile)
export class TeammatesRepository extends Repository<UserProfile> {
	async getIncomingInvitations(id: string): Promise<Partial<UserProfile[]>> {
		const user = await this
			.createQueryBuilder('UserProfile')
			.where('UserProfile.id = :id', { id })
			.leftJoin('UserProfile.incomingInvites', 'user')
			.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
			.getOne();

		if (!user) {
			throw new Error('User does not exist');
		}

		return user.incomingInvites||[];
	}

	async getPendingInvitations(id: string): Promise<Partial<UserProfile[]>> {
		const user = await this
			.createQueryBuilder('UserProfile')
			.where('UserProfile.id = :id', { id })
			.leftJoin('UserProfile.pendingInvites', 'user')
			.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
			.getOne();

		if (!user) {
			throw new Error('User does not exist');
		}

		return user.pendingInvites||[];
	}

	async createInvitation(creatorId: string, teammateId: string): Promise<void> {
		const creator = await this.findOne({ where: { id: creatorId } });
		const teammate = await this.findOne({ where: { id: teammateId } });

		if (!creator || !teammate) {
			throw new Error(`${creator ? 'teammateId' : 'creatorId'} is invalid`);
		}

		const creatorPendingInvites = <UserProfile[]>await this.getPendingInvitations(creator.id);
		const creatorIncomingInvites = await this.getIncomingInvitations(creator.id);
		const teamMateIncomingInvites = <UserProfile[]>await this.getIncomingInvitations(teammate.id);

		if (creatorPendingInvites.some(user => user && user.id === teammate.id)) {
			throw new Error('The invitation was already sent.');
		}

		if (creatorIncomingInvites.some(user => user && user.id === teammate.id)) {
			throw new Error('Please, accept incoming invite');
		}

		creator.pendingInvites = [...creatorPendingInvites, teammate];
		teammate.incomingInvites = [...teamMateIncomingInvites, creator];

		await this.save([creator, teammate]);
	}

}
