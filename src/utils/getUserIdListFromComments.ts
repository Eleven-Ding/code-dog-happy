import { CommentEntity } from "../module/comment/comment.model";
import { UserEntity } from "../module/user/user.model";

export type EnhanceCommetEntity = CommentEntity & {
  user: UserEntity; // 评论者
  comment_on_user: UserEntity; // 被评论者
};
export type EnhanceCommentItem = CommentEntity & {
  children: EnhanceCommetEntity[];
  childrenCommentCount: number;
};
export function getUserIdListFromComments(commentList: EnhanceCommentItem[]) {
  const userIds = new Set<string>();
  for (const comment of commentList) {
    userIds.add(comment.user_id);
    const children = comment.children;
    for (const child of children) {
      userIds.add(child.user_id);
      if (child.comment_on_user_id) {
        userIds.add(child.comment_on_user_id);
      }
    }
  }
  return [...userIds];
}