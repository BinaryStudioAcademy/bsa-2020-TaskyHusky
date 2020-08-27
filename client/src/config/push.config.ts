import { NotificationManager } from 'react-notifications';
import i18next from 'i18next';
import { LocalStorageKeys } from 'constants/LocalStorageKeys';
import logo from '../assets/logo192.png';

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
		const noPermAlerted = localStorage.getItem(LocalStorageKeys.SESSION_NO_PERM_PUSH_ALERTED);

		if (!noPermAlerted) {
			NotificationManager.error(i18next.t('denied_push_alert'), i18next.t('sorry_alert'), 6000);
			localStorage.setItem(LocalStorageKeys.SESSION_NO_PERM_PUSH_ALERTED, '1');
		}
	}

	private checkPermission(permission: string): boolean {
		return Notification.permission === permission;
	}

	private checkGrantedPermission(): boolean {
		return this.checkPermission(GRANTED);
	}

	private checkDeniedPermission(): boolean {
		return this.checkPermission(DENIED);
	}

	private async requestPermission(): Promise<boolean> {
		const permission = await Notification.requestPermission();
		return permission === GRANTED;
	}

	private successInitializiation(): void {
		this.granted = true;
		this.initialized = true;
	}

	private failInitialization(reason: () => void): void {
		this.initialized = true;
		reason();
	}

	private resetAlerts(): void {
		localStorage.removeItem(LocalStorageKeys.SESSION_NO_SUPPORT_PUSH_ALERTED);
		localStorage.removeItem(LocalStorageKeys.SESSION_NO_PERM_PUSH_ALERTED);
	}

	public async initialize(): Promise<void> {
		const supportOk = this.checkSupport();

		if (!supportOk) {
			return this.failInitialization(this.alertNoSupport);
		}

		const grantedPermission = this.checkGrantedPermission();
		const deniedPermission = this.checkDeniedPermission();

		if (grantedPermission) {
			this.resetAlerts();
			return this.successInitializiation();
		} else if (deniedPermission) {
			return this.failInitialization(this.alertNotGranted);
		} else {
			const isGrantedAfterRequest = await this.requestPermission();

			if (!isGrantedAfterRequest) {
				return this.failInitialization(this.alertNotGranted);
			} else {
				this.resetAlerts();
			}
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
			icon: logo,
		});

		notif.onclick = function (ev: Event) {
			if (onClick) {
				onClick.call(this, ev);
			}
			this.close();
		};
	}
}

const pushNotificationManager = new PushNotificationsManager();
export default pushNotificationManager;
