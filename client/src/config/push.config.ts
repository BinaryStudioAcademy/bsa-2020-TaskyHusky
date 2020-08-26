import { NotificationManager } from 'react-notifications';

const GRANTED = 'granted';
const DENIED = 'denied';

export default class PushManager {
	private static __initialized: boolean = false;
	private static __granted: boolean = false;

	private static checkSupport(): boolean {
		return Boolean(window.Notification);
	}

	private static alertNoSupport(): void {
		NotificationManager.error('Sorry, but your browser does not support push notifications.', 'Sorry!', 6000);
	}

	private static alertNotGranted(): void {
		NotificationManager.error('Sorry, but push notifications permission is not granted.', 'Sorry!', 6000);
	}

	private static checkGrantedPermission(): boolean {
		return Notification.permission === GRANTED;
	}

	private static checkNotDeniedPermission(): boolean {
		return Notification.permission !== DENIED;
	}

	private static async requestPermission(): Promise<boolean> {
		const permission = await Notification.requestPermission();
		return permission === GRANTED;
	}

	public static async initialize(): Promise<void> {
		const supportOk = this.checkSupport();

		if (!supportOk) {
			this.__initialized = true;
			return this.alertNoSupport();
		}

		const grantedPermission = this.checkGrantedPermission();

		if (grantedPermission) {
			this.__granted = true;
			this.__initialized = true; // All is ok!
			return;
		}

		const pendingPermission = this.checkNotDeniedPermission();
		let isGrantedAfterRequest = true;

		if (pendingPermission) {
			isGrantedAfterRequest = await this.requestPermission();
		}

		if (!isGrantedAfterRequest) {
			this.__initialized = true;
			return this.alertNotGranted();
		}

		this.__granted = true;
		this.__initialized = true; // All is ok!
	}

	public static push(title: string, message: string): void {
		if (!this.__initialized) {
			throw new Error('Not initialized');
		}

		if (!this.__granted) {
			return;
		}

		new Notification(title, {
			tag: 'ache-mail',
			body: message,
		});
	}
}
