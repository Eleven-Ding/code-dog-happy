import globalEnvConfig from "../../config";
import axios from "axios";
import url from "url";
import { GetUserInfoResponse, User } from "../../types/model";
import { AuthModel, AuthType } from "./auth.model";
import { GetGithubUserInfoResponse } from "../../types/model";

const { github, qq } = globalEnvConfig;
const { client_id, client_secret, get_access_tolen_url, get_user_info_url } =
  github;

const {
  client_id: qqClientId,
  client_secret: qqClientSecret,
  get_access_token_url: get_qq_access_token_url,
  get_user_info_url: get_qq_user_info_url,
  get_user_open_id_url,
} = qq;

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
      const { data } = await axios.get(get_qq_access_token_url, {
        params: {
          code,
          grant_type: "authorization_code",
          client_id: qqClientId,
          client_secret: qqClientSecret,
          redirect_uri: "https://www.dingshiyi.top/auth",
        },
      });
      const { access_token } = url.parse("?" + data, true).query as any;
      // 2. 获取用户openId
      const { data: openIdInfo } = await axios.get(get_user_open_id_url, {
        params: {
          access_token,
        },
      });
      const { openid } = JSON.parse(openIdInfo.split("(")[1].split(")")[0]);

      // 3. 根据 token + openid 获取 userinfo

      const { data: qqUserInfo } = await axios.get(get_qq_user_info_url, {
        params: {
          access_token,
          openid,
          oauth_consumer_key: qqClientId,
        },
      });
      const { nickname, figureurl_qq_1 } = qqUserInfo as GetUserInfoResponse;
      return {
        user_id: openid,
        username: nickname,
        avatar_url: figureurl_qq_1,
      } as User;
    } catch (error) {
      throw new Error(
        `Failed to get qq userInfo errorMsg=${(error as Error).message}`
      );
    }
  }

  // 绑定用户权限
  async bindUserRole(user_id: string, role: AuthType) {
    // 先查找是否已经存在
    return await AuthModel.create({
      user_id,
      auth_type: role,
    });
  }
}

export const authService = new AuthService();
