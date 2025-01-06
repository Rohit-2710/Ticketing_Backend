import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { singupRouter } from "./routes/signup";
import { singinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";

import { errorHandler, NotFoundError } from "@tickets2710/common";

import { Request, Response, NextFunction } from "express";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: true }));

app.use(signoutRouter);
app.use(singinRouter);
app.use(singupRouter);
app.use(currentUserRouter);

app.all("*", async () => {
  throw new NotFoundError();
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("Auth service listening on port 3000!");
  });
};
start();
