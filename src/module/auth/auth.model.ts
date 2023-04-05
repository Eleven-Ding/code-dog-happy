import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// 用户类型
export enum RolesType {
  User = 0,
  Admin = 1,
}

export type AuthParams = {
  auth_id: number;
  user_id: number;
  auth_type: RolesType;
};

@Entity("role")
export class RolesEntity {
  @PrimaryGeneratedColumn()
  auth_id: number;

  @Column()
  user_id: string;

  @Column()
  role: RolesType;

  @CreateDateColumn({ select: false })
  createdAt: string;

  @UpdateDateColumn({ select: false })
  updatedAt: string;
}
