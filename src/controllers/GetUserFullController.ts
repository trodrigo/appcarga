import { Request, Response } from "express";
import { GetUserFullService } from "../services/GetUserFullService";

class GetUserFullController {
  async handle(request: Request, response: Response) {
    const id = request.params['id'];
    console.log(id);
    const userFullService = new GetUserFullService();
    const user = await userFullService.execute(Number(id));

    return response.json(user);
  }
}

export { GetUserFullController };