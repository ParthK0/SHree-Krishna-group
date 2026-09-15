import { Request, Response, NextFunction } from 'express';

type AsyncExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

/**
 * Wraps async route handlers and forwards any thrown or rejected errors to Express next()
 * preventing unhandled promise rejections and server crashes.
 */
export const asyncHandler = (fn: AsyncExpressHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
