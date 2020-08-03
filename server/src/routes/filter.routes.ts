import { Router } from 'express';
import FilterController from '../controllers/filter.controllers';

const router = Router();
const filterController = new FilterController();

router.get('/', filterController.getFilters);

router.get('/:id', filterController.getById);

router.post('/', filterController.create);

router.put('/:id', filterController.updateById);

router.delete('/:id', filterController.deleteById);

export default router;
