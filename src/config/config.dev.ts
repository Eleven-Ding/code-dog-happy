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
    client_secret: '9f3c8099eb4d5fe9a4eb3019e7171afa0d1893e6',
    get_access_tolen_url: "https://github.com/login/oauth/access_token",
    get_user_info_url: "https://api.github.com/user",
  },
  jwt: {
    // token 密钥
    tokenSecret: "i am very pool,please v me 50",
    // token 过期时间
    expireTime: 60 * 60 * 24,
  },
} as GlobalEnvConfig;
