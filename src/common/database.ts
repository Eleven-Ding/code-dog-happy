import chalk from "chalk";
import { Sequelize } from "sequelize";
import globalEnvConfig from "../config";

const env = process.env.NODE_ENV;
const {
  database: { port, password, user, base, host, dialect },
} = globalEnvConfig;

export const sequelize = new Sequelize(base, user, password, {
  host,
  dialect,
  port,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      chalk.blue(
        `=========数据库连接成功=========\nHost: ${host}\nHort: ${port}\nEnv: ${env}`
      )
    );
  })
  .catch((error) => {
    console.error(chalk.red("Unable to connect to the database:"), error);
  });


export default sequelize;
