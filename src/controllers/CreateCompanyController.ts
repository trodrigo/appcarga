import { Request, Response } from "express";
import { CreateCompanyService } from "../services/CreateCompanyService";

class CreateCompanyController {
  async handle(request: Request, response: Response) {
    const { cnpj,
      corporate_name,
      fantasy_name,
      active,
      company_type } = request.body;
    console.log(cnpj);

    const createCompanyService = new CreateCompanyService();

    const company = await createCompanyService.execute({
      cnpj,
      corporate_name,
      fantasy_name,
      active,
      company_type
    });

    return response.json(company);
  }
}

export { CreateCompanyController };