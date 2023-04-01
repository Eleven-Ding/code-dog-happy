// 分页获取所有文章校验
import { Response, Request, NextFunction } from "express";
import { createResponse } from "../../../utils/createResponse";
export type GetAllPageParams = {
  offset: number;
  limit: number;
};

export function checkGetAllPostPrams(
  req: Request & { query: GetAllPageParams },
  res: Response,
  next: NextFunction
) {
  const { offset, limit } = req.query;

  if (offset < 0 || offset === undefined) {
    return res.send(createResponse(null, "offset not allow to be <0"));
  }
  if (limit <= 0 || limit === undefined) {
    return res.send(createResponse(null, "limit not allow to be <=0"));
  }

  req.query = {
    offset: Number(offset),
    limit: Number(limit),
  } as any;

  next();
}
