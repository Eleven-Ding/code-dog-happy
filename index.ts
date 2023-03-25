import express from "express";
import { parseRoutes } from "./src/decorator/automatic-routing";
import "./src/decorator/automatic-routing";
import { PORT } from "./src/config/constants";
import sequelize from "./src/common/database";

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
const app = express();

app.get("/", (req, res, next) => {
  res.send("Hello world111");
});

// 自动化路由
parseRoutes(app);

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
