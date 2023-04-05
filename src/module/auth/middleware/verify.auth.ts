// Token 校验中间件
import { Response, NextFunction } from "express";
import { AuthRequest } from "../../../types/model";
import { authService } from "../auth.service";
import { createResponse } from "../../../utils/createResponse";

export async function verifyAuthiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const rolesInfo = await authService.getUserRole(req.user.user_id);
    if (rolesInfo) {
      req.user.role = rolesInfo.role;
      next();
    }
    throw new Error("error while check user auth");
  } catch (error) {
    res.status(500);
    res.send(createResponse(null, (error as Error).message, -1));
  }
}
