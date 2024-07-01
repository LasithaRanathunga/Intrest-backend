import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const err = new Error("Not Authenticated");
    err.staus = 401;
    throw err;
  }
  const token = authHeader?.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "thisissomesupersupersupersecretkey");
  } catch (err) {
    err.status = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("not authenticated!");
    error.statusCode = 401;
    throw error;
  }

  req.email = decodedToken.email;
  next();
};
