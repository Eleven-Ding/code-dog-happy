import { CommentEntity } from "../module/comment/comment.model";
import { UserEntity } from "../module/user/user.model";
import { EnhanceCommentItem } from "./getUserIdListFromComments";
export type EnhanceParams = {
  users: UserEntity[];
};
export function enhanceCommentListPro(
  commentList: EnhanceCommentItem[],
  { users }: EnhanceParams
) {
  return commentList.map((comment) => {
    const children = comment.children.map((child) => {
      return {
        ...child,
        user: users.find((user) => user.user_id === child.user_id),
      };
    });
    return {
      ...comment,
      children,
      user: users.find((user) => user.user_id === comment.user_id),
    };
  });
}

export function enhanceCommentListCommon(
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
