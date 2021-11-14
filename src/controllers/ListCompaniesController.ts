import { Request, Response } from "express";
import { ListCompaniesService } from "../services/ListCompaniesService";

class ListCompaniesController {
  async handle(request: Request, response: Response) {
    const listCompaniesService = new ListCompaniesService();
    const companies = await listCompaniesService.execute();

    return response.json(companies);
  }
}

export { ListCompaniesController };