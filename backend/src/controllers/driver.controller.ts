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
  try {
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
          capacity: capacity || 'Standard',
          currentLocation: currentLocation || 'Jaipur',
          preferredRoutes: preferredRoutes || 'All Rajasthan & North India'
        }
      }
    });
  } catch (error: any) {
    console.error('[DriverController Error]:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected internal error occurred while registering vehicle and driver.'
    });
  }
};
