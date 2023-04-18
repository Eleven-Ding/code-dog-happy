import { UserEntity } from "../module/user/user.model";
import { EnhanceCommentItem } from "./getUserIdListFromComments";
export type EnhanceParams = {
  users: UserEntity[];
};
export function enhanceCommentList(
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
