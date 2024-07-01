import { Router } from "express";
import { body } from "express-validator";
import User from "../models/User.js";
import isAuth from "../middleware/is-auth.js";
import { getOneUser } from "../controllers/userActions.js";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post(
  "/updateUser",
  isAuth,
  upload.array("files"),
  async (req, res, next) => {
    //const data = {profile}
    //   console.log(req.files, req.body);
    const data = {};

    //   if (req.files[0] && req.files[1]) {
    //     data.profile = req.files[0].buffer.toString();
    //   }

    if (Array.isArray(req.files) && req.files.length >= 2) {
      // Assuming req.files is an array of Express.Multer.File
      if (req.files[0]) {
        data.profile = req.files[0].buffer.toString("base64");
      }
      if (req.files[1]) {
        data.cover = req.files[1].buffer.toString("base64");
      }
      if (req.body.discription) {
        data.discription = req.body.discription;
      }
    } else {
      console.log("error");
    }

    await User.updateUser(req.email, data);

    //   if (req.files && Array.isArray(req.files)) {
    //     for (let i = 0; i < req.files.length; i++) {
    //       console.log(req.files[i].buffer.toString());
    //     }
    //   }
    res.status(201).json({ message: "Successfully uploaded files" });
  }
);

router.get("/getOneUser", isAuth, getOneUser);

export default router;
