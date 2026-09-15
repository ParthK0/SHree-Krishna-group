import { Request, Response } from 'express';

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
  subject?: string;
}

export const submitEnquiry = async (req: Request, res: Response): Promise<void> => {
  try {
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
          email: email || '',
          message,
          subject: subject || 'General Transport Enquiry'
        }
      }
    });
  } catch (error: any) {
    console.error('[EnquiryController Error]:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected internal error occurred while submitting your enquiry.'
    });
  }
};
