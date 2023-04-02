import { DataTypes } from "sequelize";
import sequelize from "../../common/database";

export const UserModel = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName:"user",
    indexes: [
      {
        name: "username_index",
        using: "BTREE",
        fields: ["username"],
      },
    ],
  }
);


UserModel.sync();
