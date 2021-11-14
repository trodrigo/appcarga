import { Request, Response } from "express";
import { AlterCompanyService } from "../services/AlterCompanyService";

class AlterCompanyController {
  async handle(request: Request, response: Response) {
    const id = Number(request.params['id']);

    const { cnpj,
      corporate_name,
      fantasy_name,
      active,
      company_type } = request.body;

    const alterCompanyService = new AlterCompanyService();

    const company = await alterCompanyService.execute(id, {
      cnpj,
      corporate_name,
      fantasy_name,
      active,
      company_type
    });

    return response.json(company);
  }
}

export { AlterCompanyController };