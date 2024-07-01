import express from "express";
import bodyParser from "body-parser";
import multer from "multer";

import signinRouts from "./routes/authentication.js";
import userActionsRouts from "./routes/userActions.js";

const app = express();

app.use(bodyParser.json());

export const upload = multer({ storage: multer.memoryStorage() });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(signinRouts);
app.use(userActionsRouts);

app.listen(3000);
