import { NotificationManager } from 'react-notifications';
import i18next from 'i18next';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';

const GRANTED = 'granted';
const DENIED = 'denied';

interface Options {
	title?: string;
	message?: string;
	subtitle?: string;
	onClick?: (this: Notification, ev: Event) => any;
}

class PushNotificationsManager {
	private initialized: boolean = false;
	private granted: boolean = false;

	public constructor() {
		this.initialize();
	}

	private checkSupport(): boolean {
		return Boolean(window.Notification);
	}

	private alertNoSupport(): void {
		const noSupportAlerted = localStorage.getItem(LocalStorageKeys.SESSION_NO_SUPPORT_PUSH_ALERTED);

		if (!noSupportAlerted) {
			NotificationManager.error(i18next.t('not_suported_push_alert'), i18next.t('sorry_alert'), 6000);
			localStorage.setItem(LocalStorageKeys.SESSION_NO_SUPPORT_PUSH_ALERTED, '1');
		}
	}

	private alertNotGranted(): void {
		NotificationManager.error(i18next.t('denied_push_alert'), i18next.t('sorry_alert'), 6000);
	}

	private checkGrantedPermission(): boolean {
		return Notification.permission === GRANTED;
	}

	private checkNotDeniedPermission(): boolean {
		return Notification.permission !== DENIED;
	}

	private async requestPermission(): Promise<boolean> {
		const permission = await Notification.requestPermission();
		return permission === GRANTED;
	}

	private successInitializiation(): void {
		this.granted = true;
		this.initialized = true;
	}

	public async initialize(): Promise<void> {
		const supportOk = this.checkSupport();

		if (!supportOk) {
			this.initialized = true;
			return this.alertNoSupport();
		}

		const grantedPermission = this.checkGrantedPermission();

		if (grantedPermission) {
			return this.successInitializiation();
		}

		const pendingPermission = this.checkNotDeniedPermission();
		let isGrantedAfterRequest = true;

		if (pendingPermission) {
			isGrantedAfterRequest = await this.requestPermission();
		}

		if (!isGrantedAfterRequest) {
			this.initialized = true;
			return this.alertNotGranted();
		}

		this.successInitializiation();
	}

	public push(options: Options): void {
		if (!this.initialized || !this.granted) {
			return;
		}

		const { message, title = i18next.t('notification') as string, subtitle, onClick } = options;

		const notif = new Notification(title, {
			body: message,
			data: subtitle,
		});

		notif.onclick = onClick ?? null;
	}
}

const pushNotificationManager = new PushNotificationsManager();
export default pushNotificationManager;
