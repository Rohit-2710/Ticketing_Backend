import { Request, Response, Router, NextFunction } from "express";

import { NotFoundError } from "@tickets2710/common";
import { Ticket } from "../models/tickets";

const router = Router();

router.get(
  "/api/tickets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return next(new NotFoundError());
    }
    res.status(200).send(ticket);
  }
);

export { router as showTicketRouter };
