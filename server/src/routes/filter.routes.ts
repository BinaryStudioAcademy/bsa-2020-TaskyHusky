import { Router } from 'express';
import FilterController from '../controllers/filter.controllers';
import filterDef from './filterDefinition.routes';
import filterPart from './filterPart.routes';

const router = Router();
const filterController = new FilterController();

router.use('/definition', filterDef).use('/part', filterPart);

router
	.get('/', filterController.getFilters)
	.get('/recent', filterController.getRecentFilters)
	.get('/favorite', filterController.getFavFilters)
	.get('/:id', filterController.getById)
	.get('/teammates/:userId', filterController.getTeammateFilters)
	.post('/', filterController.create)
	.put('/', filterController.updateFilter)
	.delete('/:id', filterController.deleteById);

export default router;
