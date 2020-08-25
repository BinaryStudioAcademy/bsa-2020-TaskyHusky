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

export interface NotifyIssueWatchersSettings {
	issue: Issue;
	actionOrText: string;
	noLink?: boolean;
	customText?: boolean;
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

	notifyIssueWatchers({ issue, noLink, actionOrText, customText }: NotifyIssueWatchersSettings) {
		const { watchers = [], issueKey } = issue;

		return Promise.all(
			watchers.map(async (watcher) =>
				this.createOne({
					user: { ...watcher },
					text: customText ? actionOrText : `Issue ${issueKey} was ${actionOrText}.`,
					link: !noLink ? `http://${appHost}:${frontendPort}/issue/${issueKey}` : undefined,
					title: issueKey,
				}),
			),
		);
	}
}
