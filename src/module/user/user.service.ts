import { User } from "../../types/model";
import { AppDataSource } from "../../common/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.model";

export class UserService {
  userModel: Repository<UserEntity>;
  constructor() {
    this.userModel = AppDataSource.getRepository(UserEntity);
  }
  // 根据 UserId 查询用户信息
  async findByUserId(id: string) {
    const user = await this.userModel.findOne({
      where: {
        user_id: id,
      },
      select: ["username"],
    });

    return user;
  }

  async createUser(userInfo: User) {
    const { user_id, username, avatar_url } = userInfo;
    const user = await this.userModel.save({
      user_id,
      username,
      avatar_url,
    });
    return user;
  }
}

export const userService = new UserService();
