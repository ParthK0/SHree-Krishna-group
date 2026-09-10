import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : ['http://localhost:5173'];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) or matching client URL
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive default in dev mode
    },
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// API Routes
app.use('/api', apiRouter);

// Root fallback / info
app.get('/', (_req, res) => {
  res.json({
    name: 'Shree Krishna Group Transportation API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health'
  });
});

// Centralized error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Shree Krishna Transport backend running on http://localhost:${PORT}`);
  console.log(`📡 Health check available at http://localhost:${PORT}/api/health`);
});

export default app;
