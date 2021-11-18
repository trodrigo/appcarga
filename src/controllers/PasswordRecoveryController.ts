import { Request, Response } from "express";
import { PasswordRecoveryService } from "../services/PasswordRecoveryService"

class PasswordRecoveryController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;
    const passwordRecoveryService = new PasswordRecoveryService();
    const message = await passwordRecoveryService.execute(email)
    console.log(message);
    return response.json(message);
  }
}

export { PasswordRecoveryController };