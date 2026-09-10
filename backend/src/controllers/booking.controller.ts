import { Request, Response } from 'express';

export interface BookingPayload {
  name: string;
  phone: string;
  pickup: string;
  drop: string;
  goodsType: string;
  weight: string;
  truckType: string;
  comments?: string;
}

export const createBooking = async (req: Request, res: Response): Promise<void> => {
  const { name, phone, pickup, drop, goodsType, weight, truckType, comments }: BookingPayload = req.body;

  if (!name || !phone || !pickup || !drop) {
    res.status(400).json({
      success: false,
      message: 'Missing required booking fields: name, phone, pickup, and drop are required.'
    });
    return;
  }

  const bookingId = `SKG-BK-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toISOString();

  // In future: Save to database (MongoDB / PostgreSQL) or trigger webhook/SMS
  console.log(`[Booking Received] ID: ${bookingId}, Customer: ${name}, Route: ${pickup} -> ${drop}, Phone: ${phone}`);

  res.status(201).json({
    success: true,
    message: 'Booking enquiry submitted successfully',
    data: {
      bookingId,
      timestamp,
      booking: {
        name,
        phone,
        pickup,
        drop,
        goodsType,
        weight,
        truckType,
        comments
      }
    }
  });
};
