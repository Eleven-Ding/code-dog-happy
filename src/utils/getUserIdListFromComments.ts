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
export function getUserIdListFromCommentsPro(
  commentList: EnhanceCommentItem[]
) {
  const userIds = new Set<string>();
  for (const comment of commentList) {
    userIds.add(comment.user_id);
    const children = comment.children;
    for (const child of children) {
      userIds.add(child.user_id);
    }
  }
  return [...userIds];
}

export function getUserIdListFromCommentsCommon(commentList: CommentEntity[]) {
  const userIds = new Set<string>();
  for (const comment of commentList) {
    userIds.add(comment.user_id);
  }
  return [...userIds];
}
