// Token 校验中间件
import { Response, NextFunction } from "express";
import { createResponse } from "../utils/createResponse";
import { AuthRequest } from "../types/model";
import { verifyToken } from "../utils/jwt";

export function verifyAuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  // token 不存在，表示没有进行登录
  if (!token) {
    res.status(401);
    return res.send(createResponse(null, "请先登录!", -1));
  }
  try {
    const userInfo = verifyToken(token);
    req.user = userInfo;
    next();
  } catch (error) {
    // 抛出错误
    res.status(403);
    return res.send(
      createResponse(null, "invalid token ，" + (error as Error).message, -1)
    );
  }
}
