import { Request, Response } from "express";
import { Get } from "../../decorator/automatic-routing";
import { UserModel } from "./user.model";
import { PostModel } from "../posts/posts.model";
export class UserController {
  @Get("/findOne")
  async findOne(req: Request, res: Response) {
    const data = await UserModel.findAll({
      include: [
        {
          model: PostModel,
          attributes: {
            exclude: ["post_url", "post_description"],
          },
        },
      ],
    });
    res.send({
      data,
    });
  }
  // Github 登录
  @Get("/login")
  async LogInWitGithub() {
    
  }
}

export default new UserController();
