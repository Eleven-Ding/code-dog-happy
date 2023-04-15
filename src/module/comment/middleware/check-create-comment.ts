import { createResponse } from "../../../utils/createResponse";
import { CommentEntity } from "../comment.model";
import { Request, Response, NextFunction } from "express";
type CreateCommentParams = Partial<CommentEntity> & {
  postId: number;
};

export function checkCreateCommentParams(
  req: Request & { body: CreateCommentParams },
  res: Response,
  next: NextFunction
) {
  const { parentId, content, postId } = req.body as CreateCommentParams;
    // 检查参数是否完善
  if (!parentId || !content || !postId) {
    res.status(400);
    return res.send(
      createResponse(
        null,
        "Missing required fields. parentId and content and postId is required fields",
        -1
      )
    );
  }
  // 检查参数类型是否正确
  if (
    typeof Number(parentId) !== "number" ||
    typeof content !== "string" ||
    typeof Number(postId) !== "number"
  ) {
    res.status(400);
    return res.send(
      createResponse(
        null,
        "Missing required fields. parentId and content and postId is required fields",
        -1
      )
    );
  }
  next();
}
