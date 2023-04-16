import { CommentEntity } from "../module/comment/comment.model";
import { UserEntity } from "../module/user/user.model";
export type EnhanceParams = {
  users: UserEntity[];
};
export function enhanceCommentList(
  commentList: CommentEntity[],
  { users }: EnhanceParams
) {
  return commentList.map((comment) => {
    return {
      ...comment,
      user: users.find((user) => user.user_id === comment.user_id),
    };
  });
}
