import { EntityRepository, Repository, Between } from 'typeorm';
import { UserProfile } from '../entity/UserProfile';

@EntityRepository(UserProfile)
export class TeammatesRepository extends Repository<UserProfile> {
	async getIncomingInvitations(id: string): Promise<Partial<UserProfile[]>> {
		const user = await this
			.createQueryBuilder('UserProfile')
			.where('UserProfile.id = :id', { id })
			.leftJoinAndSelect('UserProfile.incomingInvites', 'user')
			// .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
			.getOne();

		console.log(user);

		if (!user || !user.incomingInvites) {
			throw new Error('User does not exist');
		}

		return user.incomingInvites;
	}

	async getPendingInvitations(id: string): Promise<Partial<UserProfile[]>> {
		const user = await this
			.createQueryBuilder('UserProfile')
			.where('UserProfile.id = :id', { id })
			.leftJoin('UserProfile.pendingInvites', 'user')
			.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
			.getOne();

		if (!user|| !user.pendingInvites) {
			throw new Error('User does not exist');
		}

		return user.pendingInvites;
	}

	async createInvitation(creatorId: string, teammateId: string): Promise<void> {
		const creator = await this.findOne({ where: { id: creatorId } });
		const teammate = await this.findOne({ where: { id: teammateId } });

		if (!creator || !teammate) {
			throw new Error(`${creator ? 'teammateId' : 'creatorId'} is invalid`);
		}

		const creatorPendingInvites = await this.getPendingInvitations(creator.id);
		const creatorIncomingInvites = await this.getIncomingInvitations(creator.id);

		if (creatorPendingInvites.some(user => user && user.id === teammate.id)) {
			throw new Error('The invitation was already sent.');
		}

		if (creatorIncomingInvites.some(user => user && user.id === teammate.id)) {
			throw new Error('Please, accept incoming invite');
		}

		creator.pendingInvites = [...creator.pendingInvites||[], teammate];
		teammate.incomingInvites = [...teammate.incomingInvites||[], creator];

		this.save([creator, teammate]);
	}

}
