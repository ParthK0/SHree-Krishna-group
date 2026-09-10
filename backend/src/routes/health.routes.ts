import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'Shree Krishna Group Transportation API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
