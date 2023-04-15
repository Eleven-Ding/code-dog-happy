import { NextFunction, Response } from "express";
import { AuthRequest } from "../../../types/model";
import { createResponse } from "../../../utils/createResponse";

export type GetAllCommentsParams = {
  offset: number;
  limit: number;
};

export function checkGetAllCommentsPrams(
  req: AuthRequest & { query: GetAllCommentsParams },
  res: Response,
  next: NextFunction
) {
  const { offset, limit } = req.query;
  // 1. 检查参数是否存在
  if (!offset || !limit) {
    res.status(400);
    return res.send(
      createResponse(
        null,
        "Missing comments parameter. offset and limit are required"
      )
    );
  }
  // 2. 检查参数类型
  if (typeof Number(offset) !== "number" || typeof Number(limit) !== "number") {
    res.status(400);
    return res.send(
      createResponse(
        null,
        "Invalid comments parameter. offset and limit must be numbers"
      )
    );
  }
  next();
}
