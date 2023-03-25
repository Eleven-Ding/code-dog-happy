import { Sequelize } from "sequelize";

const sequelize = new Sequelize("", "", "!", {
  host: "",
  dialect: "mysql",
  port: 11,
});

export default sequelize;
