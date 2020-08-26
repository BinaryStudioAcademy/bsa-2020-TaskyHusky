import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';

const controller = new NotificationController();
const router = Router();

router
	.get('/', controller.getAll)
	.get('/:id', controller.getOneById)
	.post('/', controller.postNotification)
	.put('/view', controller.viewAllNotifications)
	.put('/:id', controller.updateNotification)
	.put('/:id/view', controller.viewNotification)
	.put('/:id/unview', controller.unviewNotification)
	.delete('/:id', controller.deleteNotification);

export default router;
