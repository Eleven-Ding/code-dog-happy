import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from "typeorm";
import { UserEntity } from "../user/user.model";
import { PostEntity } from "../posts/posts.model";

export enum CommentStatus {
  normal = 1,
  delete = 2,
}

/**
 * 一个用户拥有很多评论
 * 一个评论只属于一个用户
 * 一篇文章拥有很多评论
 * 一个评论只属于一个文章
 */
@Entity("comment")
export class CommentEntity {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column()
  content: string; // 评论内容

  @Index() // 创建索引，查询更快
  @Column()
  parentId: number; // 父级Id，如果是 -1 的话，那么就是一级评论

  @Column({ default: CommentStatus.normal })
  status: number; // 当前评论的状态

  @Column({ default: "" })
  position: string; // 评论的地点，类似于显示 ip 了

  @Column({ default: 0 })
  likesCount: number; // 点赞数量

  @Column()
  user_id: string; // 评论属于谁

  @Column() 
  post_id: number; // 哪篇文章

  @CreateDateColumn()
  createdAt: string; // 评论更新时间

  @UpdateDateColumn()
  updatedAt: string; // 评论时间
}
