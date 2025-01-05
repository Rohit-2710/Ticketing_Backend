import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
// Extend the Request interface to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: Currentuser;
    }
  }
}
// interface for currentUser
interface Currentuser {
  email: string;
  id: string;
  iat?: number;
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as Currentuser;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
