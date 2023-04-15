import {
  Controller,
  Post,
  Get,
  Middleware,
} from "../../decorator/automatic-routing";
import { Repository } from "typeorm";
import { CommentEntity } from "./comment.model";
import { AppDataSource } from "../../common/typeorm";
import { verifyLoginMiddleware } from "../auth/middleware/verify.login";
import { AuthRequest } from "../../types/model";
import { Response } from "express";
import { checkCreateCommentParams } from "./middleware/check-create-comment";
import { commentService } from "./comment.service";
import { createResponse } from "../../utils/createResponse";
import {
  GetAllCommentsParams,
  checkGetAllCommentsPrams,
} from "./middleware/check-get-all-comments";

@Controller("/comment")
class CommentController {
  commentModel: Repository<CommentEntity>;
  constructor() {
    this.commentModel = AppDataSource.getRepository(CommentEntity);
  }
  @Post("/create")
  @Middleware(verifyLoginMiddleware) // 校验是否登录
  @Middleware(checkCreateCommentParams) // 参数校验
  async createComment(req: AuthRequest, res: Response) {
    try {
      await commentService.createComment(req.body, req.user);
      return res.send(createResponse(null, "评论成功"));
    } catch (error) {
      res.status(500);
      return res.send(createResponse(null, (error as Error).message, -1));
    }
  }

  @Get("getComment")
  @Middleware(checkGetAllCommentsPrams)
  async getAllComments(
    req: AuthRequest & { query: GetAllCommentsParams },
    res: Response
  ) {
    try {
      await commentService.getAllComments(req.query);
    } catch (error) {
      return res.send(createResponse(null, (error as Error).message, -1));
    }
  }
}

const commentController = new CommentController();

export default commentController;
