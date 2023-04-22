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
import { Request, Response } from "express";
import { checkCreateCommentParams } from "./middleware/check-create-comment";
import { commentService } from "./comment.service";
import { createResponse } from "../../utils/createResponse";
import {
  GetAllCommentsParams,
  checkGetAllCommentsPrams,
} from "./middleware/check-get-all-comments";
import { userService } from "../user/user.service";
import {
  enhanceCommentListPro,
  enhanceCommentListCommon,
} from "../../utils/enhanceCommentList";
import { getIp } from "../../utils/getIpFromRequest";
import {
  getUserIdListFromCommentsPro,
  getUserIdListFromCommentsCommon,
  EnhanceCommentItem,
  EnhanceCommetEntity,
} from "../../utils/getUserIdListFromComments";
import {
  checkGetChildrenCommentsPrams,
  GetChildrenCommentsParams,
} from "./middleware/check-get-children-comment";

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
      const ip = getIp(req);
      const result = await commentService.createComment(req.body, req.user, ip);
      return res.send(createResponse(result, "评论成功"));
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
      const commentList = (await commentService.getCommentListByPostId(
        req.query
      )) as EnhanceCommentItem[];

      // 2 给每个 commentId 找到 3 个 parentId === commentId 的 comment
      for (const comment of commentList) {
        const [childrenCommentList, total] =
          await commentService.getCommentsByParentId(comment.commentId);
        comment.children = childrenCommentList as EnhanceCommetEntity[];
        comment.childrenCommentCount = total;
      }

      // 3. 筛选出全部的 userId, 获取到全部的 user 信息 ，这里包括 comment_on_user_id
      const userIdList = getUserIdListFromCommentsPro(commentList);
      const users = await userService.findAllByIds(userIdList);

      // // 4. 将 user 信息聚合到 commentList 上
      // TODO: 如果点赞也做到单独的一张表，那么后续也可以将点赞信息聚合到 commentList 上
      const enhanceComments = enhanceCommentListPro(commentList, {
        users,
      });

      return res.send(createResponse(enhanceComments, "获取评论成功"));
    } catch (error) {
      return res.send(createResponse(null, (error as Error).message, -1));
    }
  }
  @Get("/children_list")
  @Middleware(checkGetChildrenCommentsPrams)
  async getChildrenCommentList(
    req: Request & {
      query: GetChildrenCommentsParams;
    },
    res: Response
  ) {
    // 1. 根据 commentId 查找全部的子评论
    try {
      const { parentId } = req.query;
      const [childCommentList] = await commentService.getCommentsByParentId(
        parentId,
        true
      );
      // 2. 获取所有 userId，查询 User 信息
      const userIdList = getUserIdListFromCommentsCommon(childCommentList);
      const users = await userService.findAllByIds(userIdList);

      // 3. 聚合信息
      const enhanceComments = enhanceCommentListCommon(childCommentList, {
        users,
      });
      return res.send(createResponse(enhanceComments, "获取子评论成功"));
    } catch (error) {
      return res.send(createResponse(null, (error as Error).message, -1));
    }
  }
}

const commentController = new CommentController();

export default commentController;
