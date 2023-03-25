import { authService } from "./auth.service";
import {
  Post,
  Get,
  MiddleWare,
  Controller,
} from "../../decorator/automatic-routing";

// 中间件
function middleWare1(req: any, res: any, next: any) {
  req.shiyi = "Hello Shiyi";
  next();
}
function middleWare2(req: any, res: any, next: any) {
  req.shier = "Shier";
  next();
}

@Controller("/auth")
class AuthContoller {
  @Get("/getname")
  @MiddleWare(middleWare2)
  @MiddleWare(middleWare1)
  async handleGetName(req: any, res: any) {
    const data = await authService.login();
    return res.send({
      name: "Hello AuthContoller",
      data: "authService 处理数据" + data,
      shiyi: req.shiyi,
      shier: req.shier,
    });
  }
  @Get("/update")
  async UpdateUserInfo(req: any, res: any) {
    return res.send({
      name: "Hello Update",
    });
  }
}
const authController = new AuthContoller();

export default authController;
