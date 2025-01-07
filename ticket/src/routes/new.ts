import { Request, Response, Router, NextFunction } from "express";
import { currentUser, requireAuth } from "@tickets2710/common";

const router = Router();

router.post(
  "/api/tickets/new",
  [requireAuth],
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Hello, World!");
  }
);

export { router as createTicketRouter };
