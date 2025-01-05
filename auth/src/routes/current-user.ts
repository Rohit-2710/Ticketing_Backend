import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
const router = express.Router();

router.get(
  "/api/user/currentuser",
  [currentUser, requireAuth],
  (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
