import { Controller, Get, Post } from "../../decorator/automatic-routing";
import { Response } from "express";
import { Middleware } from "../../decorator/automatic-routing";
import { verifyLoginMiddleware } from "../auth/middleware/verify.login";
import { AuthRequest } from "../../types/model";
import { checkCreatePostParams } from "./middleware/check-create-post";
import { CreatePostParams } from "./middleware/check-create-post";
import { postsService } from "./posts.service";
import { createResponse } from "../../utils/createResponse";
import { checkGetAllPostPrams } from "./middleware/check-get-all-post";
import { GetAllPageParams } from "./middleware/check-get-all-post";
import { verifyIsSelfPost } from "./middleware/verify-self-post";
import { verifyAuthiddleware } from "../auth/middleware/verify.auth";
import { userService } from "../user/user.service";
import { enhancePostInfo } from "../../utils/enhancePostInfo";
import { commentService } from "../comment/comment.service";

@Controller("/post")
export class PostsController {
  // 创建文章
  @Post("/create")
  @Middleware(verifyLoginMiddleware)
  @Middleware(checkCreatePostParams)
  async createPost(req: AuthRequest, res: Response) {
    try {
      await postsService.createPosts(req.body as CreatePostParams, req.user);
      res.send(createResponse(null, "创建文章成功"));
    } catch (error) {
      res.send(createResponse(null, (error as Error).message, -1));
    }
  }

  // 分页获取所有文章
  @Get("/all")
  @Middleware(checkGetAllPostPrams)
  async findAll(req: AuthRequest & { query: GetAllPageParams }, res: Response) {
    const { offset, limit } = req.query;
    try {
      // 1. 查询所有文章
      const [posts, count] = await postsService.findAll(limit, offset);

      // 2. 根据文章查询所有的用户信息
      const userIds = posts.map((post) => post.user_id);
      const postIds = posts.map((post) => post.post_id);
      const users = await userService.findAllByIds(userIds);

      // 4. 获取每个文章的评论数量
      const comments = await commentService.getCommentsByPostId(postIds);

      // 3. 把 user, comment 信息增强到 posts 上
      const enhancePosts = enhancePostInfo(posts, {
        users,
        comments,
      });

      res.send(createResponse([enhancePosts, count], "查询成功"));
    } catch (error) {
      res.send({ data: (error as Error).message });
    }
  }

  // 获取文章详情
  @Get("/detail")
  async findOne(
    req: AuthRequest & { query: { post_id: number } },
    res: Response
  ) {
    const { post_id } = req.query;
    if (!post_id && post_id !== 0) {
      return res.send(createResponse(null, "post_id is require", -1));
    }
    Promise.all([
      postsService.findOne(post_id),
      commentService.getCommentsCountByPostId(post_id),
    ])
      .then(([result, comment_count]) => {
        res.send(
          createResponse(
            {
              ...result,
              comment_count,
            },
            "查询成功"
          )
        );
      })
      .catch((error) => {
        res.send(createResponse(null, `查询失败${(error as Error).message}`));
      });
  }

  // 更新文章信息
  @Post("/update")
  @Middleware(verifyIsSelfPost) // 2. 检测更新的文章是否是自己的文章
  @Middleware(verifyAuthiddleware)
  @Middleware(verifyLoginMiddleware) // 1. 校验是否登录
  async updatePost(req: AuthRequest, res: Response) {
    res.send("111");
  }
}
const postsController = new PostsController();

export default postsController;
