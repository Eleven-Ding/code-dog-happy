import { User } from "../../types/model";
import { CreatePostParams } from "./middleware/check-create-post";
import { PostModel } from "./posts.model";

export class PostsService {
  async createPosts(body: CreatePostParams, user: User) {
    const { user_id } = user;

    const result = await PostModel.create({
      ...body,
      user_id,
    });
    return result.toJSON();
  }


  async findAll(limit: number, offset: number) {
    return await PostModel.findAndCountAll({
      limit,
      offset,
    });
  }
}

export const postsService = new PostsService();
