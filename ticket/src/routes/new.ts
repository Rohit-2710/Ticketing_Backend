import { Request, Response, Router, NextFunction } from "express";
import { currentUser, requireAuth, validateRequest } from "@tickets2710/common";
import { body } from "express-validator";
import { Ticket } from "../models/tickets";

const router = Router();

router.post(
  "/api/tickets/new",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, price } = req.body;
    const currentUserId = req.currentUser!.id;
    const ticket = Ticket.build({ title, price, userId: currentUserId });
    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
