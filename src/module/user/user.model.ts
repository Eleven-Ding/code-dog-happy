import { DataTypes } from "sequelize";
import sequelize from "../../common/database";
import { PostModel } from "../posts/posts.model";

export const UserModel = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
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
    freezeTableName: true,
  }
);

UserModel.hasMany(PostModel, {
  foreignKey: "post_id",
  sourceKey: "user_id",
});
