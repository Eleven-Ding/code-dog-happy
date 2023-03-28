import express from "express";
import { parseRoutes } from "./src/decorator/automatic-routing";
import "./src/decorator/automatic-routing";
import { PORT } from "./src/config/constants";
import "./src/common/database";

const app = express();


app.get("/", (req, res, next) => {
  res.send("Hello world111");
});

// 自动化路由
parseRoutes(app);

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
