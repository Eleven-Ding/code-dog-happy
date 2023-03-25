import { authService } from "./auth.service";
import {
  Post,
  Get,
  MiddleWare,
  Controller,
} from "../../decorator/automatic-routing";
import { Response, Request } from "express";

@Controller("/auth")
class AuthContoller {
  @Get("/getname")
  async handleGetName(req: Request, res: Response) {
    const data = await authService.login();
    return res.send({
      name: "Hello AuthContoller",
      data: "authService 处理数据" + data,
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
