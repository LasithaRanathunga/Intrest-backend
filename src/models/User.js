import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class User {
  profile =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  cover =
    "https://static.vecteezy.com/system/resources/previews/003/475/139/non_2x/grey-abstract-background-wallpaper-design-free-vector.jpg";
  discription = "hey there!!!";

  constructor(fname, lname, email, password) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
  }

  async createUser() {
    try {
      const user = await prisma.users.create({ data: this });
      //console.log("User created:", user);
      return {
        id: user.id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      };
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  static async updateUser(email, data) {
    try {
      const user = await prisma.users.update({
        where: { email: email },
        data: { ...data },
      });
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  static async getUniqueUserByEmail(email) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
        include: {
          posts: true,
        },
      });
      return user;
    } catch (error) {
      console.error("Error finding user:", error);
    }
  }
}
