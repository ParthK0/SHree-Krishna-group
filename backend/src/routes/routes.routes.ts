import { Router } from 'express';
import {
  getAllRoutes,
  getRouteBySlug,
  upsertRoute,
  deleteRoute,
} from '../controllers/routes.controller.js';

const router = Router();

router.get('/', getAllRoutes);
router.get('/:slug', getRouteBySlug);
router.post('/', upsertRoute);
router.put('/:slug', upsertRoute);
router.delete('/:slug', deleteRoute);

export default router;
