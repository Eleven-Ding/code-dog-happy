import express from "express";
import { parseRoutes } from "./src/decorator/automatic-routing";
import bodyParser from "body-parser";
import "./src/common/database";
import { initHttpServer } from "./src/common/adapter";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.send("<h1>欢迎来到 Code Dog</h1>");
});

// 自动化路由
parseRoutes(app);

// 根据不同的环境启动 http 或者 https
initHttpServer(app);
