import { Controller, Get, Post } from "../../decorator/automatic-routing";
import { Response } from "express";
import { Middleware } from "../../decorator/automatic-routing";
import { verifyAuthMiddleware } from "../auth/middleware/verify.auth";
import { AuthRequest } from "../../types/model";
import { checkCreatePostParams } from "./middleware/check-create-post";
import { CreatePostParams } from "./middleware/check-create-post";
import { postsService } from "./posts.service";
import { createResponse } from "../../utils/createResponse";
import { checkGetAllPostPrams } from "./middleware/check-get-all-post";
import { GetAllPageParams } from "./middleware/check-get-all-post";

@Controller("/post")
export class PostsController {
  // 创建文章
  @Post("/create")
  @Middleware(verifyAuthMiddleware)
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
      const result = await postsService.findAll(limit, offset);

      res.send(createResponse(result, "查询成功"));
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
    try {
      const result = await postsService.findOne(post_id);
      res.send(createResponse(result?.toJSON(), "查询成功"));
    } catch (error) {
      res.send(createResponse(null, `查询失败${(error as Error).message}`));
    }
  }
}
const postsController = new PostsController();

export default postsController;
