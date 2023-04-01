import { Response, Request, NextFunction } from "express";
import { createResponse } from "../../../utils/createResponse";

export type CreatePostParams = {
  post_url?: string;
  post_title: string;
  post_description?: string;
  post_content: string;
  post_state?: number;
};

// 校验创建文章的参数 & 做参数的
export function checkCreatePostParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { post_title, post_content } = req.body as CreatePostParams;

  if (!post_title) {
    return res.send(createResponse(null, "post_title is required", -1));
  }
  if (!post_content) {
    return res.send(createResponse(null, "post_content is required", -1));
  }

  next();
}
