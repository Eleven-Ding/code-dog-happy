export enum Env {
  development = "development",
  production = "production",
}

export type DataBaseConfig = {
  host: string;
  dialect: 'mysql';
  port: number;
  base: string; // 数据库名称
  user: string;
  password: string;
};

export type GlobalEnvConfig = {
  database: DataBaseConfig;
};
