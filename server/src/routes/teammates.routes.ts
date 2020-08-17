import { Router } from 'express';
import TeammatesController from '../controllers/teammates.controllers';

const router = Router();
const teammatesController = new TeammatesController();

router.get('/:id/incoming-invites', teammatesController.getIncomingInvitation);
router.get('/:id/pending-invites', teammatesController.getPendingInvitation);
router.post('/:id/pending-invites', teammatesController.createInvite);

export default router;
