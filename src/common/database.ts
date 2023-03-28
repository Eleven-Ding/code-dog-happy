import { Sequelize } from "sequelize";
import globalEnvConfig from "../config";

const {
  database: { port, password, user, base, host, dialect },
} = globalEnvConfig;
const sequelize = new Sequelize(base, user, password, {
  host,
  dialect,
  port,
});

export default sequelize;
