import { Request } from "express";

export type User = {
  username: string;
  user_id: number;
  avatar_url: string;
  hidden?: boolean;
};

export type GithubUserInfo = {
  // Github 登录唯一 ID，每次登录 ID 不变动
  id: number;
  // Githu 头像
  avatar_url: string;
  // Github 昵称
  name: string;
  // Github 展示名
  login: string;
  // Gi thub 链接
  url: string;
};

export type AuthRequest = Request & { user: User };
