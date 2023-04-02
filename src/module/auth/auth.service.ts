import globalEnvConfig from "../../config";
import axios from "axios";
import url from "url";
import { User } from "../../types/model";
import { generateToken } from "../../utils/jwt";
import { AuthModel, AuthType } from "./auth.model";
import { GetGithubUserInfoResponse } from "../../types/model";

const { github } = globalEnvConfig;
const { client_id, client_secret, get_access_tolen_url, get_user_info_url } =
  github;

class AuthService {
  // Github 登录
  async loginWithGithub(code: string): Promise<User> {
    try {
      // 1. 根据 code 获取 accessToken
      const { data } = await axios.post(
        `${get_access_tolen_url}?client_id=${client_id}&client_secret=${client_secret}&code=${code}`
      );
      const { access_token } = url.parse("?" + data, true).query;
      // 2. 根据 accessToken 获取 用户信息
      const { data: githubUserInfo } =
        await axios.get<GetGithubUserInfoResponse>(get_user_info_url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

      const { id, avatar_url, name } = githubUserInfo;
      return {
        username: name,
        user_id: id,
        avatar_url,
      };
    } catch (error) {
      throw new Error(
        `Failed to get github userInfo errorMsg=${(error as Error).message}`
      );
    }
  }
  async loginWithQQ(code: string): Promise<User> {
    try {
      // 1. 根据 code 获取 accessToken
      // 2. 获取 openId
      // 3. 获取 userInfo
      return {} as User;
    } catch (error) {
      throw error;
    }
  }

  // 绑定用户权限
  async bindUserRole(user_id: number, role: AuthType) {
    // 先查找是否已经存在
    return await AuthModel.create({
      user_id,
      auth_type: role,
    });
  }
}

export const authService = new AuthService();
