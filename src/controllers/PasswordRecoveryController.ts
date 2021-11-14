import { Request, Response } from "express";
import { PasswordRecoveryService } from "../services/PasswordRecoveryService"

class PasswordRecoveryController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;
    const passwordRecoveryService = new PasswordRecoveryService();

    return response.json(passwordRecoveryService.execute(email));
  }
}

export { PasswordRecoveryController };