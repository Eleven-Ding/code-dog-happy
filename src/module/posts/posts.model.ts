import { DataTypes } from "sequelize";
import sequelize from "../../common/database";

export const PostModel = sequelize.define(
  "Post",
  {
    // 文章 ID
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // 文章封面
    post_url: {
      type: DataTypes.STRING,
    },
    // 文章标题
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 文章描述
    post_description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    // 阅读数
    view_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 文章内容
    // 存储 markdown 内容
    post_content: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    // 文章状态
    // 1. 草稿 、2. 发布  3. 删除(隐藏)
    post_state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "post",
  }
);

// PostModel.sync({ force: true });

// PostModel.create({
//   post_url: "111",
//   post_title: "title",
//   user_id: 1,
//   post_description: "描述",
// });
