import express from "express";

const router = express.Router();

router.post("/api/user/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Email and password must be provided");
  }
});

export { router as singupRouter };
