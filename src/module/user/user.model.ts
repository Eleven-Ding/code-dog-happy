import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";
import { PostEntity } from "../posts/posts.model";

@Entity("user")
export class UserEntity {
  @PrimaryColumn()
  user_id: string;

  @Column()
  avatar_url: string;

  @Column()
  username: string;

  @Column({ default: 0, select: false })
  hidden?: number;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;
}
