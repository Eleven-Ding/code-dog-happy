import { commentService } from "./comment.service";
import {
  Controller,
  Post,
  Middleware,
} from "../../decorator/automatic-routing";
import { Repository } from "typeorm";
import { CommentEntity } from "./comment.model";
import { AppDataSource } from "../../common/typeorm";
import { verifyLoginMiddleware } from "../auth/middleware/verify.login";
import { AuthRequest } from "../../types/model";
import { Response } from "express";

@Controller("comment")
class CommentController {
  commentModel: Repository<CommentEntity>;
  constructor() {
    this.commentModel = AppDataSource.getRepository(CommentEntity);
  }
  @Post("/create")
  @Middleware(verifyLoginMiddleware) // 校验是否登录
  // TODO: 校验参数
  async createComment(req: AuthRequest, res: Response) {}
}

const commentController = new CommentController();

export default commentController;
