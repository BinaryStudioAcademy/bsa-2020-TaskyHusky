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

		return user.incomingInvites || [];
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

		return user.pendingInvites || [];
	}

	async getTeammates(id: string): Promise<Partial<UserProfile[]>> {
		const user = await this
			.createQueryBuilder('UserProfile')
			.where('UserProfile.id = :id', { id })
			.leftJoin('UserProfile.teammates', 'user')
			.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.avatar'])
			.getOne();

		if (!user) {
			throw new Error('User does not exist');
		}

		return user.teammates || [];
	}

	async createInvitation(creatorId: string, teammateId: string): Promise<void> {
		const creator = await this.findOne({ where: { id: creatorId } });
		const teammate = await this.findOne({ where: { id: teammateId } });

		if (!creator || !teammate) {
			throw new Error(`${creator ? 'teammateId' : 'creatorId'} is invalid`);
		}

		const creatorPendingInvites = <UserProfile[]>await this.getPendingInvitations(creator.id);
		const creatorTeammates = <UserProfile[]>await this.getTeammates(creator.id);
		const creatorIncomingInvites = <UserProfile[]>await this.getIncomingInvitations(creator.id);
		const teamMateIncomingInvites = <UserProfile[]>await this.getIncomingInvitations(teammate.id);

		if (creatorTeammates.some(user => user.id === teammate.id)) {
			throw new Error('You are already teammates');
		}

		if (creatorPendingInvites.some(user => user.id === teammate.id)) {
			throw new Error('The invitation has been already sent.');
		}

		if (creatorIncomingInvites.some(user => user.id === teammate.id)) {
			throw new Error('Please, accept incoming invite');
		}

		creator.pendingInvites = [...creatorPendingInvites, teammate];
		teammate.incomingInvites = [...teamMateIncomingInvites, creator];

		await this.save([creator, teammate]);
	}


	async changeInviteStatus(senderId: string, receiverId: string, isAcceptance:boolean) {
		const sender = await this.findOne({ where: { id: senderId } });
		const receiver = await this.findOne({ where: { id: receiverId } });

		if (!sender || !receiver) {
			throw new Error(`${sender ? 'receiverId' : 'senderId'} is invalid`);
		}

		const senderIncomingInvites = <UserProfile[]>await this.getIncomingInvitations(sender.id);
		const receiverPendingInvites = <UserProfile[]>await this.getPendingInvitations(receiver.id);

		if (!senderIncomingInvites.some(user => user.id === receiver.id) ||
			!receiverPendingInvites.some(user => user.id === sender.id)) {
			throw new Error('This invite is broken');
		}

		const senderTeammates = <UserProfile[]>await this.getTeammates(sender.id);
		const receiverTeammates = <UserProfile[]>await this.getTeammates(receiver.id);

		if(isAcceptance){
			sender.teammates = [...senderTeammates, receiver];
			receiver.teammates = [...receiverTeammates, sender];
		}

		sender.incomingInvites = senderIncomingInvites.filter((user) => user.id !== receiver.id);
		receiver.pendingInvites = receiverPendingInvites.filter((user) => user.id !== sender.id);

		await this.save([sender, receiver]);
	}
}
