import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../user/user.model";
import { CommentEntity } from "../comment/comment.model";

@Entity("post")
export class PostEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  post_url: string;

  @Column()
  post_title: string;

  @Column({ default: "" })
  post_description?: string;

  @Column({ default: 0 })
  view_count: number;

  @Column({ type: "mediumtext" })
  post_content: string;

  @Column({ default: 0 })
  post_state: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column()
  user_id: string; 
}

export enum Post_state {
  Publish = 0,
  Draft = 1,
  Drop = 2,
}

export type PostParams = {
  post_id: number;
  user_id: number;
  post_url?: string;
  post_title: string;
  post_description: string;
  view_count: number;
  post_content: number;
};
