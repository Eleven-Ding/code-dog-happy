import { GlobalEnvConfig } from "./../types/config";
export default {
  database: {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    base: "code_dog", // 数据库名称
    user: "root",
    password: "dsy19991030.",
  },
  github: {
    client_id: "eb5bed26c16fde7dbbe3",
    client_secret: '**********',
    get_access_tolen_url: "https://github.com/login/oauth/access_token",
    get_user_info_url: "https://api.github.com/user",
  },
  jwt: {
    // token 密钥
    tokenSecret: "i am very pool,please v me 50",
    // token 过期时间
    expireTime: 60 * 60,
  },
} as GlobalEnvConfig;
