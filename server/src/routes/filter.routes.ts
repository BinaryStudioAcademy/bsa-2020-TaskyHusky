import { Router } from 'express';
import FilterController from '../controllers/filter.controllers';
import filterDef from './filterDefinition.routes';
import filterPart from './filterPart.routes';

const router = Router();
const filterController = new FilterController();

router.use('/definition', filterDef).use('/part', filterPart);

router
	.get('/', filterController.getFilters)
	.get('/:id', filterController.getById)
	.post('/', filterController.create)
	.put('/:id', filterController.updateById)
	.delete('/:id', filterController.deleteById);

export default router;
