import { Router } from 'express';
import healthRoutes from './health.routes.js';
import bookingsRoutes from './bookings.routes.js';
import driversRoutes from './drivers.routes.js';
import enquiriesRoutes from './enquiries.routes.js';
import routesRoutes from './routes.routes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/bookings', bookingsRoutes);
apiRouter.use('/drivers', driversRoutes);
apiRouter.use('/enquiries', enquiriesRoutes);
apiRouter.use('/routes', routesRoutes);

export default apiRouter;
