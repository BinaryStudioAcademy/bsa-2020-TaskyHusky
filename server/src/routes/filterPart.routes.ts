import { Router } from 'express';
import FilterPartController from '../controllers/filterPart.controllers';

const router = Router();
const filterPartController = new FilterPartController();

router.get('/', filterPartController.getFilterParts);

router.get('/:id', filterPartController.getById);

router.post('/', filterPartController.create);

router.put('/:id', filterPartController.updateById);

router.delete('/:id', filterPartController.deleteById);

export default router;
