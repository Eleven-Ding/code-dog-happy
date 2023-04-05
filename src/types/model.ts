import { Request } from "express";

export type User = {
  username: string;
  user_id: string;
  avatar_url: string;
  hidden?: boolean;
  role?: number;
};

export type GetGithubUserInfoResponse = {
  // Github 登录唯一 ID，每次登录 ID 不变动
  id: string;
  // Githu 头像
  avatar_url: string;
  // Github 昵称
  name: string;
  // Github 展示名
  login: string;
  // Gi thub 链接
  url: string;
};

// 获取 QQ 的用户信息
export type GetUserInfoResponse = {
  nickname: string;
  figureurl_qq_1: string;
};

// 获取 QQ 的 open_id
export type GetUnionidResponse = {
  client_id: string;
  openid: string;
  unionid: string;
};
export type AuthRequest = Request & { user: User };
