import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";


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
  
  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;
}
