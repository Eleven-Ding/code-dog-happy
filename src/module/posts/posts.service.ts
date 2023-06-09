import { User } from "../../types/model";
import { CreatePostParams } from "./middleware/check-create-post";
import { PostEntity } from "./posts.model";
import { Repository } from "typeorm";
import { AppDataSource } from "../../common/typeorm";

export class PostsService {
  postRepository: Repository<PostEntity>;
  constructor() {
    this.postRepository = AppDataSource.getRepository(PostEntity);
  }
  async createPosts(body: Partial<PostEntity>, user: User) {
    const { user_id } = user;
    const result = await this.postRepository.save({
      ...body,
      user_id,
    });
    return result;
  }

  async findAll(limit: number, offset: number) {
    return await this.postRepository.findAndCount({
      take: limit,
      skip: offset,
      select: [
        "post_description",
        "post_id",
        "post_state",
        "post_title",
        "post_url",
        "view_count",
        "createdAt",
        "updatedAt",
        "user_id",
      ],
      order: {
        post_id: "desc",
      },
    });
  }

  async findOne(post_id: number) {
    return await this.postRepository.findOne({
      where: {
        post_id,
      },
    });
  }

  // 更新文章信息，权限在 controller 层进行判断
  async update(post: Partial<PostEntity>) {
    return await this.postRepository.save(post);
  }
}

export const postsService = new PostsService();
