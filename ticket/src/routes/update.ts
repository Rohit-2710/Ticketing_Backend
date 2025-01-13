import { Request, Response, Router, NextFunction } from "express";
import {
  NotFoundError,
  requireAuth,
  validateRequest,
  NotAuthorizedError,
} from "@tickets2710/common";

import { Ticket } from "../models/tickets";
import { body } from "express-validator";

const router = Router();

router.patch(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }
    const currentUserId = req.currentUser!.id;
    if (ticket.userId !== currentUserId) {
      throw new NotAuthorizedError();
    }
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();
    res.status(200).send(ticket);
  }
);

export { router as updateTicketRouter };
