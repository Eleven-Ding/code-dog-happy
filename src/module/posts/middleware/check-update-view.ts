import { Response, Request, NextFunction } from "express";
import { createResponse } from "../../../utils/createResponse";

export type UpdatePostView = {
  post_id: number;
};

// 校验创建文章的参数 & 做参数的
export function checkUpdateViewarams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { post_id } = req.body as UpdatePostView;

  if (!post_id) {
    res.status(400);
    return res.send(createResponse(null, "post_id is required", -1));
  }

  next();
}
