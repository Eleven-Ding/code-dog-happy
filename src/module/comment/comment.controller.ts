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
import { userService } from "../user/user.service";
import { enhanceCommentList } from "../../utils/enhanceCommentList";

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
      let ip = "";
      if (req.headers["X-Real-IP"]) {
        ip = req.headers["X-Real-IP"] as string;
      } else if (req.ip) {
        ip = req.ip.split(":").pop()!;
      }
      await commentService.createComment(req.body, req.user, ip);
      return res.send(createResponse(null, "评论成功"));
    } catch (error) {
      res.status(500);
      return res.send(createResponse(null, (error as Error).message, -1));
    }
  }

  @Get("/list")
  @Middleware(checkGetAllCommentsPrams)
  async getAllComments(
    req: AuthRequest & { query: GetAllCommentsParams },
    res: Response
  ) {
    try {
      // 1. 获取一级评论的列表
      const commentList = await commentService.getCommentListByPostId(
        req.query
      );
      // 2. 筛选出全部的 userId, 获取到全部的 user 信息
      const userIdList = commentList.map((item) => item.user_id);
      const users = await userService.findAllByIds(userIdList);
      // 3. 将 user 信息聚合到 commentList 上
      const enhanceComments = enhanceCommentList(commentList, {
        users,
      });
      // 4. 获取所有一级评论下的第一条子评论，和全部的数量
      return res.send(createResponse(enhanceComments, "获取评论成功"));
    } catch (error) {
      return res.send(createResponse(null, (error as Error).message, -1));
    }
  }
}

const commentController = new CommentController();

export default commentController;
