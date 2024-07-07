import { Router } from "express";
import { body } from "express-validator";
import User from "../models/User.js";
import isAuth from "../middleware/is-auth.js";
import {
  getOneUser,
  updateUser,
  createPost,
} from "../controllers/userActions.js";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/updateUser", isAuth, upload.array("files"), updateUser);

router.get("/getOneUser", isAuth, getOneUser);

router.post("/createPost", isAuth, upload.single("image"), createPost);

export default router;
