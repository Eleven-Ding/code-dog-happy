import { User } from "../../types/model";
import { UserModel } from "./user.model";

export class UserService {
  // 根据 UserId 查询用户信息
  async findByUserId(id: string) {
    const user = await UserModel.findOne({
      where: {
        user_id: id,
      },
      // 这里尝试只取一个
      attributes: ["username"],
    });
    return user?.toJSON();
  }

  async createUser(userInfo: User) {
    const user = await UserModel.create({
      ...userInfo,
    });
    return user;
  }
}

export const userService = new UserService();
