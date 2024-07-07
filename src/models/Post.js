import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class {
  constructor(content, image, authorId) {
    this.content = content;
    this.image = image;
    this.authorId = authorId;
  }

  async createPost() {
    try {
      const post = await prisma.posts.create({ data: this });

      return post;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
}
