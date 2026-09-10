import { Router } from 'express';
import { registerDriver } from '../controllers/driver.controller.js';

const router = Router();

router.post('/', registerDriver);

export default router;
