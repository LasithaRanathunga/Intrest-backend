import User from "../models/User.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

export async function signin(req, res, next) {
  if (req.body.password == req.body.conPassword) {
    const encryptedPassword = await bcrypt.hash(req.body.password, 12);

    const user = await User.getUniqueUserByEmail(req.body.email);

    if (!user) {
      console.log("***", req.body);
      const result = validationResult(req);
      if (result.isEmpty()) {
        const user = new User(
          req.body.fname,
          req.body.lname,
          req.body.email,
          encryptedPassword
        );
        const createdUser = await user.createUser();
        console.log(createdUser);

        const token = jwt.sign(
          { email: createdUser?.email, id: createdUser?.id },
          "thisissomesupersupersupersecretkey"
        );
        return res
          .status(201)
          .json({ token: token, status: "success", ...createdUser });
      } else {
        next(new Error("signin failed"));
      }
    } else {
      next(new Error("User already exist"));
      res.status(400).json("user exist");
      console.log("user exist");
    }
  } else {
    const err = new Error("password confirm failed");
    next(err);
  }
}

export async function login(req, res, next) {
  console.log("login called");
  const result = validationResult(req);
  const user = await User.getUniqueUserByEmail(req.body.email);
  console.log(user);
  console.log(req.body);
  const encryptedPassword = await bcrypt.hash(req.body.password, 12);
  console.log(user?.password == encryptedPassword);
  if (result.isEmpty() || user) {
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    console.log("isMaych", isMatch);
    if (isMatch) {
      const token = jwt.sign(
        { email: req.body.email, id: user?.id },
        "thisissomesupersupersupersecretkey"
      );
      res.status(200).json({ token: token, status: "success" });
    } else {
      // const error: any = new Error("Password does not match");
      // error.status = 401;
      // throw error;
      res.status(400).json("login failed, password does not match");
    }
  } else {
    const error = new Error("Account does not exist");
    error.status = 400;
    throw error;
  }
}
