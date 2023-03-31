import globalEnvConfig from "../../config";
import axios from "axios";
import url from "url";
import { GithubUserInfo, User } from "../../types/model";
import { generateToken } from "../../utils/jwt";

const { github } = globalEnvConfig;
const { client_id, client_secret, get_access_tolen_url, get_user_info_url } =
  github;

class AuthService {
  // Github 登录
  async loginWithGithub(code: string): Promise<GithubUserInfo> {
    try {
      // 1. 根据 code 获取 accessToken
      const { data } = await axios.post(
        `${get_access_tolen_url}?client_id=${client_id}&client_secret=${client_secret}&code=${code}`
      );
      const { access_token } = url.parse("?" + data, true).query;
      // 2. 根据 accessToken 获取 用户信息
      const userInfo = await axios.get(get_user_info_url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return userInfo.data;
    } catch (error) {
      throw new Error(
        `Failed to get github userInfo errorMsg=${(error as Error).message}`
      );
    }
  }
}

export const authService = new AuthService();
