import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../types/model";
import { createResponse } from "../../../utils/createResponse";

export type GetChildrenCommentsParams = {
  parentId: number;
};

export function checkGetChildrenCommentsPrams(
  req: AuthRequest & { query: GetChildrenCommentsParams },
  res: Response,
  next: NextFunction
) {
  const { parentId } = req.query;
  //  1. 检查参数是否存在
  if (!parentId) {
    res.status(400);
    return res.send(createResponse(null, "parentId is required", -1));
  }
  //  2. 检查参数类型
  if (typeof Number(parentId) !== "number") {
    res.status(400);
    return res.send(createResponse(null, "parentId must be a number", -1));
  }
  next();
}
