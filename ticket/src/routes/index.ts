import { Request, Response, Router, NextFunction } from "express";
import { Ticket } from "../models/tickets";

const router = Router();

router.get(
  "/api/tickets",
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.find({});
    res.status(200).send(ticket);
  }
);

export { router as listTicketRouter };
