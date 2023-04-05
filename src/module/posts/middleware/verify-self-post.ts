import { AuthRequest } from "../../../types/model";
import { NextFunction, Response } from "express";
import { PostParams } from "../posts.model";
import { postsService } from "../posts.service";
import { createResponse } from "../../../utils/createResponse";

export async function verifyIsSelfPost(
  req: AuthRequest & { body: Partial<PostParams> },
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  const { post_id } = req.body;
  if (!post_id) {
    return res.send(createResponse(null, "post_id is required", -1));
  }
  try {
    // const result = await postsService.findOne(post_id);
    // if (!result || result.user_id !== user.user_id) {
    //   return res.send(
    //     createResponse(null, "can not update other users posts", -1)
    //   );
    // }
  } catch (error) {
    return res.send(
      createResponse(null, "error why check post update auth", -1)
    );
  }
  next();
}
