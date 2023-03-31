import { Controller, Get, Post } from "../../decorator/automatic-routing";
import { Request, Response } from "express";
import { Middleware } from "../../decorator/automatic-routing";
import { verifyAuthMiddleware } from "../../authVerify.ts/verify.auth";
import { AuthRequest } from "../../types/model";

@Controller("/post")
export class PostsController {
  @Get("/one")
  findOne(req: Request, res: Response) {
    res.send("Post");
  }
  // 创建文章
  @Post("/create")
  @Middleware(verifyAuthMiddleware)
  createPost(req: AuthRequest, res: Response) {
    console.log(req.user);
    return res.send({
      user: req.user,
    });
  }

  @Post("/all")
  findAll() {}

  // 更新文章信息
  @Post("/update")
  @Middleware(verifyAuthMiddleware)
  updaePost() {}
}
const postsController = new PostsController();

export default postsController;
