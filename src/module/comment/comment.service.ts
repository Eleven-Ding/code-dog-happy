import { In, Repository } from "typeorm";
import { CommentEntity } from "./comment.model";
import { AppDataSource } from "../../common/typeorm";
import { postsService } from "../posts/posts.service";
import { User } from "../../types/model";
import { GetAllCommentsParams } from "./middleware/check-get-all-comments";

class CommentService {
  commentRepository: Repository<CommentEntity>;

  constructor() {
    this.commentRepository = AppDataSource.getRepository(CommentEntity);
  }

  // 创建评论
  async createComment(
    body: Partial<CommentEntity> & { postId: number },
    { user_id }: User
  ) {
    const { postId } = body;
    // 1. 查看该 Post 是否存在
    const post = await postsService.findOne(postId);
    if (!post) {
      throw new Error("Post not found where postId = " + postId);
    }
    const { post_id } = post;
    // 2. 插入评论，关联 Post 和 User
    const comment = await this.commentRepository.save({
      content: body.content,
      parentId: body.parentId,
      user_id,
      post_id,
    });
    return comment;
  }

  // 分页查询评论
  async getAllComments({ limit, offset }: GetAllCommentsParams) {
    const comments = await this.commentRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return comments;
  }

  // 根据 文章 id 获取评论的数量
  async getCommentsByPostId(postId: number[]) {
    const comments = await this.commentRepository.find({
      where: { post_id: In(postId) },
      select: ["post_id"],
    });
    return comments;
  }

  async getCommentsCountByPostId(post_id: number) {
    const count = await this.commentRepository.count({
      where: {
        post_id,
      },
    });
    return count
  }

  // 根据文章 id 分页获取评论
  async getCommentsByPostIds(postId: number) {
    const comments = await this.commentRepository.findAndCount({
      // take: limit,
      // skip: offset,
      where: { post_id: postId },
    });
  }
}

export const commentService = new CommentService();
