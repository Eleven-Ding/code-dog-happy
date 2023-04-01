import { DataTypes } from "sequelize";
import sequelize from "../../common/database";

// 用户类型
export enum AuthType {
  User = 0,
  Admin = 1,
}

export const AuthModel = sequelize.define(
  "Auth",
  {
    auth_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    auth_type: {
      type: DataTypes.INTEGER,
      defaultValue: AuthType.User,
    },
  },
  {
    tableName: "auth",
  }
);

AuthModel.sync();
