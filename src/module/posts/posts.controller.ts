import { Controller, Get, Post } from "../../decorator/automatic-routing";
import { Request, Response } from "express";

// 文章更新 需要对应的权限，这个可以在中间件做
// 参数教研可以在中间件去做
@Controller("/post")
export class PostsController {
  @Get("/one")
  findOne(req: Request, res: Response) {
    res.send("Post");
  }
  @Post("/create")
  createPost() {}

  @Post("/all")
  findAll() {}

  // 更新文章信息
  @Post("/update")
  updaePost() {}
}
const postsController = new PostsController();

export default postsController;
