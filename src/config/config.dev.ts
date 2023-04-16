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
    client_secret: "******",
    get_access_tolen_url: "https://github.com/login/oauth/access_token",
    get_user_info_url: "https://api.github.com/user",
  },
  jwt: {
    // token 密钥
    tokenSecret: "i am very pool,please v me 50",
    // token 过期时间
    expireTime: 60 * 60 * 24,
  },
  port: {
    dev: 3003,
    prod: 9004,
  },
  qq: {
    client_id: 101956106,
    client_secret: "******",
    get_access_token_url: "https://graph.qq.com/oauth2.0/token",
    get_user_info_url: "https://graph.qq.com/user/get_user_info",
    get_user_open_id_url: "https://graph.qq.com/oauth2.0/me",
  },
  amap: {
    ip: {
      url: "https://restapi.amap.com/v3/ip",
      key: "7a59d9b4a55ab11976b1dfb46695f6a2",
    },
  },
} as GlobalEnvConfig;
