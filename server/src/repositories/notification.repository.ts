import { EntityRepository, Repository } from 'typeorm';
import { Notification } from '../entity/Notification';
import { Issue } from '../entity/Issue';
import { appHost, frontendPort } from '../../config/app.config';
import { UserProfile } from '../entity/UserProfile';
import { NotificationActions } from '../models/IO';
import notificationHandler from '../socketConnectionHandlers/notification.handler';

export interface CreateNotification {
	text: string;
	user: UserProfile;
	title?: string;
	link?: string;
}

export interface UpdateNoification extends Partial<CreateNotification> {
	isViewed?: boolean;
}

export interface NotifyIssueWatchersSettings {
	issue: Issue;
	actionOrText: string;
	noLink?: boolean;
	customText?: boolean;
	senderId: string;
}

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {
	findAllByUser(userId: string) {
		return this.find({ where: { user: { id: userId } }, loadEagerRelations: true });
	}

	findOneById(id: string) {
		return this.findOneOrFail({ where: { id }, loadEagerRelations: true });
	}

	async createOne(data: CreateNotification) {
		const instance = this.create({
			...data,
			createdAt: new Date(),
		});

		const result = await this.save(instance);
		const newNotif = await this.findOneById(result.id);
		notificationHandler.emit(NotificationActions.CreateNotification, newNotif);

		return result;
	}

	updateOneById(id: string, data: UpdateNoification) {
		return this.update({ id }, data);
	}

	viewOneById(id: string) {
		notificationHandler.emit(NotificationActions.ViewNotification, id);
		return this.updateOneById(id, { isViewed: true });
	}

	unviewOneById(id: string) {
		notificationHandler.emit(NotificationActions.UnviewNotification, id);
		return this.updateOneById(id, { isViewed: false });
	}

	viewAll(userId: string) {
		notificationHandler.emit(NotificationActions.ViewAllNotifications, userId);
		return this.update({ user: { id: userId } }, { isViewed: true });
	}

	deleteOneById(id: string) {
		return this.delete({ id });
	}

	notifyIssueWatchers({ issue, noLink, actionOrText, customText, senderId }: NotifyIssueWatchersSettings) {
		const { watchers = [], issueKey } = issue;

		return Promise.all(
			watchers.map(
				async (watcher) =>
					watcher.id !== senderId &&
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
