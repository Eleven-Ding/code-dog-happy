export enum Env {
  development = "development",
  production = "production",
}

export type DataBaseConfig = {
  host: string;
  dialect: "mysql";
  port: number;
  base: string; // 数据库名称
  user: string;
  password: string;
};

export type Github = {
  client_id: string;
  client_secret: string;
  get_access_tolen_url: string;
  get_user_info_url: string;
};

export type QQ = {
  client_id: number;
  client_secret: string;
  get_access_token_url: string;
  get_user_info_url: string;
  get_user_open_id_url: string;
};
export type GlobalEnvConfig = {
  database: DataBaseConfig;
  github: Github;
  qq: QQ;
  jwt: {
    tokenSecret: string;
    expireTime: number;
  };
  port: {
    dev: number;
    prod: number;
  };
  amap:{
    ip:{
      url: string;
      key: string;
    }
  }
};
