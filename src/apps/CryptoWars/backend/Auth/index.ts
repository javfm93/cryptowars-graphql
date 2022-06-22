import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const requireAuth = function (req: Request, res: Response, next: any) {
  if (req.isAuthenticated()) return next();
  res.status(httpStatus.UNAUTHORIZED).send();
};
