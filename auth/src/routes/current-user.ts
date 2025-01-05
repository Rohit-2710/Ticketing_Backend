import express, { Request, Response } from "express";
import { currentUser, requireAuth } from "@tickets2710/common";
const router = express.Router();

router.get(
  "/api/user/currentuser",
  [currentUser, requireAuth],
  (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
