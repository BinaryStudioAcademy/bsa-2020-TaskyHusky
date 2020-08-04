import { Router } from 'express';
import FilterDefinitionController from '../controllers/filterDefinition.controllers';

const router = Router();
const filterDefinitionController = new FilterDefinitionController();

router.get('/', filterDefinitionController.getFilterDefinitions);

router.get('/:id', filterDefinitionController.getById);

router.post('/', filterDefinitionController.create);

router.put('/:id', filterDefinitionController.updateById);

router.delete('/:id', filterDefinitionController.deleteById);

export default router;
