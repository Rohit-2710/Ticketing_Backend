import express from "express";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { singupRouter } from "./routes/signup";
import { singinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";

import { errorHandler } from "./middlewares/error-handler";
import { Request, Response, NextFunction } from "express";

const app = express();
app.use(json());

app.use(signoutRouter);
app.use(singinRouter);
app.use(singupRouter);
app.use(currentUserRouter);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(3000, () => {
  console.log("Auth service listening on port 3000 !");
});
