import { Router } from 'express';
import {
  getAllRoutes,
  getRouteBySlug,
  upsertRoute,
  deleteRoute,
} from '../controllers/routes.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(getAllRoutes));
router.get('/:slug', asyncHandler(getRouteBySlug));
router.post('/', asyncHandler(upsertRoute));
router.put('/:slug', asyncHandler(upsertRoute));
router.delete('/:slug', asyncHandler(deleteRoute));

export default router;
