import { User } from "../../types/model";
import { AppDataSource } from "../../common/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.model";
import { In } from "typeorm";
import globalEnvConfig from "../../config";
import axios from "axios";

const {
  amap: {
    ip: { url, key },
  },
} = globalEnvConfig;

export type UserLocationInfo = {
  status: string;
  province?: string;
  city: string;
};

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

  // 创建用户
  async createUser(userInfo: User) {
    const { user_id, username, avatar_url } = userInfo;
    const user = await this.userModel.save({
      user_id,
      username,
      avatar_url,
    });
    return user;
  }

  // 根据 ids 找到所有匹配的用户
  async findAllByIds(userIds: string[]) {
    const users = await this.userModel.find({
      where: {
        user_id: In(userIds),
      },
    });
    return users;
  }

  // 根据 ip 获取用户地址
  async getAddressByIp(ip: string): Promise<UserLocationInfo> {
    const result = await axios.get(url, {
      params: {
        key,
        ip,
      },
    });
    return result.data;
  }
}

export const userService = new UserService();
