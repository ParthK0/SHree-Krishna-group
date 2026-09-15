import { Router } from 'express';
import { createBooking } from '../controllers/booking.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateBookingInput } from '../middleware/validateInput.js';

const router = Router();

router.post('/', validateBookingInput, asyncHandler(createBooking));

export default router;
