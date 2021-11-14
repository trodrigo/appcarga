import { Request, Response } from "express";
import { GetUserService } from "../services/GetUserService";

class GetUserController {
  async handle(request: Request, response: Response) {
    const id = request.params['id'];
    console.log(id);
    const userService = new GetUserService();
    const user = await userService.execute(Number(id));

    return response.json(user);
  }
}

export { GetUserController };