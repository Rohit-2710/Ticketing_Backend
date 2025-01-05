import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "@tickets2710/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/user/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    req.session = {
      jwt: jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        process.env.JWT_KEY!
      ),
    };
    res.status(200).send(existingUser);
  }
);

export { router as singinRouter };
