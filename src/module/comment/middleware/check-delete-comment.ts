import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../types/model";
import { createResponse } from "../../../utils/createResponse";
import { commentService } from "../comment.service";

export type DeleteCommentParams = {
  comment_id: number;
};

export async function checkDeleteCommentParamsAndAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { comment_id } = req.body as DeleteCommentParams;
  const user = req.user;
  //  1. 检查参数是否存在
  if (!comment_id) {
    return res.send(createResponse(null, "commentId is required", -1));
  }
  // 2. 检查该评论是不是自己的
  const comment = await commentService.findOne(comment_id);
  if (!comment) {
    res.status(400);
    return res.send(createResponse(null, "comment is not found", -1));
  }
  if (comment.user_id !== user.user_id) {
    res.status(403);
    return res.send(createResponse(null, "comment is not yours", -1));
  }
  next();
}
