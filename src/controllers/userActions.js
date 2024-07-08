import User from "../models/User.js";
import Post from "../models/Post.js";

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

export async function updateUser(req, res, next) {
  //const data = {profile}
  //   console.log(req.files, req.body);
  const data = {};

  //   if (req.files[0] && req.files[1]) {
  //     data.profile = req.files[0].buffer.toString();
  //   }
  console.log(req.body);
  if (Array.isArray(req.body.files) && req.body.files.length >= 2) {
    // Assuming req.files is an array of Express.Multer.File
    if (req.body.fname) {
      data.fname = req.body.fname;
    }
    if (req.body.lname) {
      data.lname = req.body.lname;
    }
    if (req.body.files[0]) {
      data.profile = req.body.files[0];
    }
    if (req.body.files[1]) {
      data.cover = req.body.files[1];
    }
    if (req.body.discription) {
      data.discription = req.body.discription;
    }
  } else {
    console.log("error");
  }

  console.log(data);

  await User.updateUser(req.email, data);

  //   if (req.files && Array.isArray(req.files)) {
  //     for (let i = 0; i < req.files.length; i++) {
  //       console.log(req.files[i].buffer.toString());
  //     }
  //   }
  res.status(201).json({ message: "Successfully uploaded files" });
}

export async function createPost(req, res, next) {
  const post = new Post(req.body.content, req.body.image, req.id);
  const newPost = await post.createPost();
  res.status(201).json(newPost);
}
