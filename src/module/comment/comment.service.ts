import { In, Repository } from "typeorm";
import { CommentEntity } from "./comment.model";
import { AppDataSource } from "../../common/typeorm";
import { postsService } from "../posts/posts.service";
import { User } from "../../types/model";
import { GetAllCommentsParams } from "./middleware/check-get-all-comments";
import { userService } from "../user/user.service";

class CommentService {
  commentRepository: Repository<CommentEntity>;

  constructor() {
    this.commentRepository = AppDataSource.getRepository(CommentEntity);
  }

  // 创建评论
  async createComment(
    {
      postId,
      content,
      parentId,
      comment_on_user_id,
    }: Partial<CommentEntity> & { postId: number },
    { user_id }: User,
    ip?: string
  ) {
    let position = "地球";
    // 1. 查看该 Post 是否存在
    const post = await postsService.findOne(postId);
    if (!post) {
      throw new Error("Post not found where postId = " + postId);
    }
    // 2. 根据 ip 获取地址
    if (ip && ip.length > 4 && ip !== "127.0.0.1") {
      const { province, city } = await userService.getAddressByIp(ip);
      if (province && city) {
        position = `${province} - ${city}`;
      }
    }

    const { post_id } = post;
    // 3. 插入评论，关联 Post 和 User
    const comment = await this.commentRepository.save({
      content,
      parentId,
      position,
      user_id,
      post_id,
      comment_on_user_id,
    });
    return comment;
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
    return count;
  }

  // 根据文章 id 分页获取第一级评论
  async getCommentListByPostId({
    postId,
    limit,
    offset,
  }: GetAllCommentsParams) {
    const comments = await this.commentRepository.find({
      where: { post_id: postId, parentId: -1 },
      take: limit,
      skip: offset,
      order: {
        createdAt: "DESC",
      },
    });
    return comments;
  }
  // 根据 commentId 查找子评论
  async getCommentsByParentId(commentId: number, take = 30, skip = 0) {
    const commentListCount = await this.commentRepository.findAndCount({
      where: {
        parentId: commentId,
      },
      take,
      skip,
    });
    return commentListCount;
  }
}

export const commentService = new CommentService();
