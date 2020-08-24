import { EntityRepository, Repository } from 'typeorm';
import { Notification } from '../entity/Notification';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
	findAllByUser(userId: string) {
		return this.find({ where: { user: { id: userId } } });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id } });
	}

	createOne(data: Notification) {
		const instance = this.create(data);
		return this.save(instance);
	}

	updateOneById(id: string, data: Notification) {
		return this.update({ id }, data);
	}

	deleteOneById(id: string) {
		return this.delete({ id });
	}
}
