import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
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

// Body parsing with safe size limits (prevents 413 payload floods)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(requestLogger);

// Global rate limiter: 100 requests per minute per IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 429,
      message: 'Too many requests from this IP. Please wait a minute and try again.'
    }
  }
});
app.use(globalLimiter);

// Strict rate limiter for form submissions: 5 submissions per minute per IP
const formLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 429,
      message: 'Form submission limit reached. Please wait a moment before sending another request or contact us via WhatsApp.'
    }
  }
});
app.use('/api/bookings', formLimiter);
app.use('/api/enquiries', formLimiter);
app.use('/api/drivers', formLimiter);

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

// Catch-all 404 for unknown /api/* endpoints
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 404,
      message: `API endpoint '${req.originalUrl}' not found. Please refer to /api/health for available services.`
    }
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
