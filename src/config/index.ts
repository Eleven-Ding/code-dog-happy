import chalk from "chalk";
import fs from "fs";
import path from "path";
import { Env, GlobalEnvConfig } from "../types/config";

const ext = process.env.NODE_ENV === "development" ? "ts" : "js";
let globalEnvConfig: GlobalEnvConfig = {} as GlobalEnvConfig;
switch (process.env.NODE_ENV) {
  case Env.development:
    const filePath = path.resolve(__dirname, `./config.dev.${ext}`);
    if (!fs.existsSync(filePath)) {
      console.log(chalk.yellow("[ Warn ] development config is not exsit"));
      break;
    }
    globalEnvConfig = require(filePath).default;
    break;
  case Env.production:
    globalEnvConfig = require(path.resolve(
      __dirname,
      `./config.prod.${ext}`
    )).default;
}

export default globalEnvConfig;
