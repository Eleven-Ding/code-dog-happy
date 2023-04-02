import { authService } from "./auth.service";
import url from "url";
import { Get, Controller } from "../../decorator/automatic-routing";
import { Response, Request } from "express";
import { userService } from "../user/user.service";
import { User } from "../../types/model";
import { generateToken } from "../../utils/jwt";
import { createResponse } from "../../utils/createResponse";
import { AuthType } from "./auth.model";

export enum LoginType {
  GitHub = "github",
  QQ = "qq",
}

@Controller("/auth")
class AuthContoller {
  @Get("/login")
  async Login(req: Request, res: Response) {
    const { code, type } = url.parse(req.url, true).query;
    if (!code) {
      return res.send(createResponse(null, "code is not exsit !", -1));
    }
    let OAuthUserInfo = {} as User;

    try {
      if (type === LoginType.GitHub) {
        // 1. 通过 GitHub 登录获取 UserInfo
        OAuthUserInfo = await authService.loginWithGithub(code as string);
      } else if (type === LoginType.QQ) {
        OAuthUserInfo = await authService.loginWithQQ(code as string);
      } else {
        return res.send(createResponse(null, "本站点暂未支持该种登录方式", -1));
      }

      // 2. 通过 id 查找该用户是否登录
      const { user_id, username, avatar_url } = OAuthUserInfo;
      const userInfo: User = {
        user_id,
        username,
        avatar_url,
      };
      const user = await userService.findByUserId(user_id);

      // 3. 如果 user 不存在 则需要将 User 进行插入，插入应该不用阻塞 Token 的生成
      if (!user) {
        await userService.createUser(userInfo);
        // 4. 绑定权限
        await authService.bindUserRole(userInfo.user_id, AuthType.User); // 默认是绑定 User
      }

      // 5. 生成 Token
      const token = generateToken(userInfo);

      await res.send(
        createResponse({ token, userInfo }, "Login with github success")
      );
    } catch (error) {
      res.send(
        createResponse(
          null,
          `login error, please login again ErrorMsg = ${
            (error as Error).message
          }`,
          -1
        )
      );
    }
  }
}
const authController = new AuthContoller();

export default authController;
