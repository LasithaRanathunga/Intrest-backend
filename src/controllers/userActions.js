import User from "../models/User.js";

export async function getOneUser(req, res, next) {
  let user;

  user = await User.getUniqueUserByEmail(req.email);

  if (user) {
    // const profile = Buffer.from(user.profile, "base64");
    // const cover = Buffer.from(user.cover, "base64");

    // user.profile = profile;
    // user.cover = cover;

    res.status(200).json(user);
  } else {
    res.status(404).json({ error: { message: "not signed in" } });
  }
}
