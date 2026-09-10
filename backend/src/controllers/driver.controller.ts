import { Request, Response } from 'express';

export interface DriverPayload {
  driverName: string;
  phone: string;
  vehicleNumber: string;
  vehicleType: string;
  capacity?: string;
  currentLocation?: string;
  preferredRoutes?: string;
}

export const registerDriver = async (req: Request, res: Response): Promise<void> => {
  const {
    driverName,
    phone,
    vehicleNumber,
    vehicleType,
    capacity,
    currentLocation,
    preferredRoutes
  }: DriverPayload = req.body;

  if (!driverName || !phone || !vehicleNumber || !vehicleType) {
    res.status(400).json({
      success: false,
      message: 'Missing required fields: driverName, phone, vehicleNumber, and vehicleType are required.'
    });
    return;
  }

  const driverId = `SKG-DRV-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toISOString();

  // In future: Save to database or alert fleet manager
  console.log(`[Driver Registered] ID: ${driverId}, Name: ${driverName}, Vehicle: ${vehicleNumber} (${vehicleType})`);

  res.status(201).json({
    success: true,
    message: 'Driver registration submitted successfully',
    data: {
      driverId,
      timestamp,
      driver: {
        driverName,
        phone,
        vehicleNumber,
        vehicleType,
        capacity,
        currentLocation,
        preferredRoutes
      }
    }
  });
};
