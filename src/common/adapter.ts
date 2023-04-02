import fs from "fs";
import https from "https";
import { Express } from "express";
import http from "http";
import path from "path";
import globalEnvConfig from "../config";
const {
  port: { dev, prod },
} = globalEnvConfig;

export function initHttpServer(app: Express) {
  http.createServer(app).listen(dev, () => {
    console.log(`开发服务器启动成功！端口号：${dev}`);
  });

  let privateKey = fs.readFileSync(
    path.join(__dirname, "./ssl/ssl.key"),
    "utf8"
  );
  let certificate = fs.readFileSync(
    path.join(__dirname, "./ssl/ssl.pem"),
    "utf8"
  );
  let credentials = { key: privateKey, cert: certificate };
  https.createServer(credentials, app).listen(prod, () => {
    console.log(`生产服务器启动成功！端口号：${prod}`);
  });
}
