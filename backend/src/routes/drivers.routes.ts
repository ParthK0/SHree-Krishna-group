import { Router } from 'express';
import { registerDriver } from '../controllers/driver.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateDriverInput } from '../middleware/validateInput.js';

const router = Router();

router.post('/', validateDriverInput, asyncHandler(registerDriver));

export default router;
