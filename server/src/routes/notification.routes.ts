import { NotificationController } from '../controllers/notification.controller';
import { Router } from 'express';

const controller = new NotificationController();
const router = Router();

router
	.get('/byUser/:id', controller.getAll)
	.get('/:id', controller.getOneById)
	.post('/', controller.postNotification)
	.put('/:id', controller.updateNotification)
	.delete('/:id', controller.deleteNotification);

export default router;
