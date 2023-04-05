import { AppDataSource } from "../../common/typeorm";
import { UserEntity } from "./user.model";
import { Repository } from "typeorm";
import { Controller, Get } from "../../decorator/automatic-routing";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { createResponse } from "../../utils/createResponse";
const aboutMeFilePath = "../../static/me.md";

@Controller("/user")
export class UserController {
  userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }
  @Get("/me")
  async getAboutMe(req: Request, res: Response) {
    try {
      const aboutMdContent = await fs.readFileSync(
        path.resolve(__dirname, aboutMeFilePath),
        { encoding: "utf-8" }
      );
      res.send(createResponse(aboutMdContent, "获取个人介绍成功"));
    } catch (error) {
      res.send(
        createResponse("> 不好意思，服务器开小差去了", "获取个人介绍失败", -1)
      );
    }
  }
}

export default new UserController();
