import { Router } from "express";
import { body } from "express-validator";

import { signin, login } from "../controllers/authentication.js";

const router = Router();

router.post(
  "/signin",
  body("*").trim().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  signin
);

router.post(
  "/login",
  body("*").trim().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  login
);

export default router;
