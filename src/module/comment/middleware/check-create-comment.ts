import { CommentEntity } from "../comment.model";
import { Request, Response, NextFunction } from "express";
type CreateCommentParams = Partial<CommentEntity>;

export function checkCreateCommentParams(
  req: Request & { body: CreateCommentParams },
  res: Response,
  next: NextFunction
) {
  // 检查参数是否完善
  // 检查参数类型是欧
}
