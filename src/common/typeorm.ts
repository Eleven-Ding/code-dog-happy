import { CommentEntity } from './../module/comment/comment.model';
import { DataSource } from "typeorm";
import { UserEntity } from "../module/user/user.model";
import globalEnvConfig from "../config";
import { RolesEntity } from "../module/auth/auth.model";
import { PostEntity } from "../module/posts/posts.model";
import chalk from "chalk";


const {
  database: { port, password, user, base, host },
} = globalEnvConfig;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: host,
  port: port,
  username: user,
  password: password,
  database: base,
  entities: [UserEntity, RolesEntity, PostEntity, CommentEntity],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log(
      chalk.blue(
        `=========数据库连接成功=========\nHost: ${host}\nHort: ${port}\nEnv: ${process.env.NODE_ENV}`
      )
    );
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
