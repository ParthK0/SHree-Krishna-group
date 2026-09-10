import { Request, Response } from 'express';

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  subject?: string;
}

export const submitEnquiry = async (req: Request, res: Response): Promise<void> => {
  const { name, phone, email, message, subject }: EnquiryPayload = req.body;

  if (!name || !phone || !message) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: name, phone, and message are required.'
    });
    return;
  }

  const enquiryId = `SKG-ENQ-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toISOString();

  console.log(`[Enquiry Received] ID: ${enquiryId}, From: ${name}, Phone: ${phone}`);

  res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully',
    data: {
      enquiryId,
      timestamp,
      enquiry: {
        name,
        phone,
        email,
        message,
        subject
      }
    }
  });
};
