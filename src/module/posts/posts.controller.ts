import { Controller, Get } from "../../decorator/automatic-routing";
@Controller("/post")
export class PostsController {
  @Get()
  handlePostUpdate(req: any, res: any) {
    res.send("Post");
  }
}
const postsController = new PostsController();

export default postsController;
