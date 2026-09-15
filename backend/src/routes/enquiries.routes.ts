import { Router } from 'express';
import { submitEnquiry } from '../controllers/enquiry.controller.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validateEnquiryInput } from '../middleware/validateInput.js';

const router = Router();

router.post('/', validateEnquiryInput, asyncHandler(submitEnquiry));

export default router;
