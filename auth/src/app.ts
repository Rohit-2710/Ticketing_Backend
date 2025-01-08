import express from "express";
import "express-async-errors";
import { json } from "body-parser";

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

export { app };
