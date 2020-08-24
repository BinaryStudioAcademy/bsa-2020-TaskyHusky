import { EntityRepository, Repository } from 'typeorm';
import { Notification } from '../entity/Notification';
import { Issue } from '../entity/Issue';
import { appHost, frontendPort } from '../../config/app.config';
import { UserProfile } from '../entity/UserProfile';

export interface CreateNotification {
	text: string;
	user: UserProfile;
	title?: string;
	link?: string;
}

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
	findAllByUser(userId: string) {
		return this.find({ where: { user: { id: userId } } });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id } });
	}

	createOne(data: CreateNotification) {
		const instance = this.create({
			...data,
			createdAt: new Date(),
		});

		return this.save(instance);
	}

	updateOneById(id: string, data: Partial<CreateNotification>) {
		return this.update({ id }, data);
	}

	deleteOneById(id: string) {
		return this.delete({ id });
	}

	notifyIssueWatchers(issue: Issue, action: string, noLink?: boolean) {
		const { watchers = [], issueKey } = issue;

		return Promise.all(
			watchers.map(async (watcher) =>
				this.createOne({
					user: { ...watcher },
					text: `Issue ${issueKey} was ${action}.`,
					link: !noLink ? `http://${appHost}:${frontendPort}/issue/${issueKey}` : undefined,
					title: issueKey,
				}),
			),
		);
	}
}
