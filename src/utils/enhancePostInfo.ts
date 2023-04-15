import { CommentEntity } from "../module/comment/comment.model";
import { PostEntity } from "../module/posts/posts.model";
import { UserEntity } from "../module/user/user.model";

export type EnhanceParams = {
  users: UserEntity[];
  comments: CommentEntity[];
};
export function enhancePostInfo(
  posts: PostEntity[],
  { users, comments }: EnhanceParams
) {
  return posts.map((post) => {
    const user = users.find((user) => user.user_id === post.user_id);
    return {
      ...post,
      user,
      comment_count: comments.filter(
        (comment) => comment.post_id === post.post_id
      ).length,
    };
  });
}
