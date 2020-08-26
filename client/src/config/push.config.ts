import { NotificationManager } from 'react-notifications';

const GRANTED = 'granted';
const DENIED = 'denied';

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
		NotificationManager.error('Sorry, but your browser does not support push notifications.', 'Sorry!', 6000);
	}

	private alertNotGranted(): void {
		NotificationManager.error('Sorry, but push notifications permission is not granted.', 'Sorry!', 6000);
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

	public async initialize(): Promise<void> {
		const supportOk = this.checkSupport();

		if (!supportOk) {
			this.initialized = true;
			return this.alertNoSupport();
		}

		const grantedPermission = this.checkGrantedPermission();

		if (grantedPermission) {
			this.granted = true;
			this.initialized = true; // All is ok!
			return;
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

		this.granted = true;
		this.initialized = true; // All is ok!
	}

	public push(title: string, message: string): void {
		console.log(this.initialized, this.granted);
		if (!this.initialized || !this.granted) {
			return;
		}

		new Notification(title, {
			tag: 'ache-mail',
			body: message,
		});
	}
}

const pushNotificationManager = new PushNotificationsManager();
export default pushNotificationManager;
