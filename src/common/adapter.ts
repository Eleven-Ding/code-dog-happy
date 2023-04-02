import fs from "fs";
import https from "https";
import { Express } from "express";
import http from "http";
import path from "path";
import globalEnvConfig from "../config";
const isProd = process.env.NODE_ENV === "production";
const { port } = globalEnvConfig;

export function initHttpServer(app: Express) {
  if (!isProd) {
    http.createServer(app).listen(port, () => {
      console.log(`开发服务器启动成功！端口号：${port}`);
    });
    return;
  }

  let privateKey = fs.readFileSync(
    path.join(__dirname, "./ssl/ssl.key"),
    "utf8"
  );
  let certificate = fs.readFileSync(
    path.join(__dirname, "./ssl/ssl.pem"),
    "utf8"
  );
  let credentials = { key: privateKey, cert: certificate };
  https.createServer(credentials, app).listen(port, () => {
    console.log(`生产服务器启动成功！端口号：${port}`);
  });
}
