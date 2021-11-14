import { Request, Response } from "express";
import { GetCompanyService } from "../services/GetCompanyService";

class GetCompanyController {
  async handle(request: Request, response: Response) {
    const id = request.params['id'];
    console.log(id);
    const companyService = new GetCompanyService();
    const company = await companyService.execute(Number(id));

    return response.json(company);
  }
}

export { GetCompanyController };