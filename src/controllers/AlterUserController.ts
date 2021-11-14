import { Request, Response } from "express";
import { AlterUserService } from "../services/AlterUserService";

class AlterUserController {
  async handle(request: Request, response: Response) {
    const {
      company_id,
      email,
      password,
      name,
      access_level,
      active } = request.body;

    const id = Number(request.params['id']);
    const alterUserService = new AlterUserService();
    const user = await alterUserService.execute(id, {
      company_id,
      email,
      name,
      access_level,
      active
    })

    return response.json(user);
  }
}

export { AlterUserController };