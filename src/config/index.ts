import chalk from "chalk";
import fs from "fs";
import path from "path";
import { Env, GlobalEnvConfig } from "../types/config";

let globalEnvConfig: GlobalEnvConfig = {} as GlobalEnvConfig;
switch (process.env.NODE_ENV) {
  case Env.development:
    const filePath = path.resolve(__dirname, "./config.dev.ts");
    if (!fs.existsSync(filePath)) {
      console.log(chalk.yellow("[ Warn ] development config is not exsit"));
      break;
    }
    globalEnvConfig = require(filePath).default;
    break;
  case Env.production:
    globalEnvConfig = require(path.resolve(
      __dirname,
      "./config.prod.ts"
    )).default;
}

export default globalEnvConfig;
