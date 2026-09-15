import { Request, Response, NextFunction } from 'express';

export const isIndianMobile = (phone: string): boolean => {
  if (!phone) return false;
  const clean = phone.replace(/[\s+-]/g, '');
  // Match 10 digits starting with 6-9, or +91 followed by 10 digits
  return /^(?:91)?[6-9]\d{9}$/.test(clean);
};

export const isValidEmail = (email: string): boolean => {
  if (!email) return true; // optional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const validateBookingInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, phone, pickup, drop, weight } = req.body || {};
  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Valid customer name is required (minimum 2 characters).';
  }

  if (!phone || !isIndianMobile(phone)) {
    errors.phone = 'Valid 10-digit Indian mobile number is required (starts with 6-9).';
  }

  if (!pickup || typeof pickup !== 'string' || pickup.trim().length < 2) {
    errors.pickup = 'Valid pickup location is required.';
  }

  if (!drop || typeof drop !== 'string' || drop.trim().length < 2) {
    errors.drop = 'Valid drop location is required.';
  }

  if (weight !== undefined && weight !== null && weight !== '') {
    const num = parseFloat(String(weight));
    if (isNaN(num) || num <= 0) {
      errors.weight = 'Weight must be a positive number.';
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(422).json({
      success: false,
      message: 'Validation failed for booking submission.',
      errors
    });
    return;
  }

  next();
};

export const validateEnquiryInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, phone, email, message } = req.body || {};
  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Valid name is required (minimum 2 characters).';
  }

  if (!phone || !isIndianMobile(phone)) {
    errors.phone = 'Valid 10-digit Indian mobile number is required (starts with 6-9).';
  }

  if (email && !isValidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    errors.message = 'Message must be at least 5 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    res.status(422).json({
      success: false,
      message: 'Validation failed for enquiry submission.',
      errors
    });
    return;
  }

  next();
};

export const validateDriverInput = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { driverName, phone, vehicleNumber, vehicleType } = req.body || {};
  const errors: Record<string, string> = {};

  if (!driverName || typeof driverName !== 'string' || driverName.trim().length < 2) {
    errors.driverName = 'Valid driver name is required.';
  }

  if (!phone || !isIndianMobile(phone)) {
    errors.phone = 'Valid 10-digit Indian mobile number is required (starts with 6-9).';
  }

  if (!vehicleNumber || typeof vehicleNumber !== 'string' || vehicleNumber.trim().length < 4) {
    errors.vehicleNumber = 'Valid vehicle registration number is required (e.g. RJ14 GB 1234).';
  }

  if (!vehicleType || typeof vehicleType !== 'string' || vehicleType.trim().length < 2) {
    errors.vehicleType = 'Vehicle type is required.';
  }

  if (Object.keys(errors).length > 0) {
    res.status(422).json({
      success: false,
      message: 'Validation failed for driver registration.',
      errors
    });
    return;
  }

  next();
};
