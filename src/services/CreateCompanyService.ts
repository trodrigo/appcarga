import { createConnection } from "typeorm";
import { CompanyRepositories } from "../repositories/CompanyRepositories";

interface ICompanyRequest {
  cnpj: string;
  corporate_name: string;
  fantasy_name: string;
  active: boolean;
  company_type: number;
}
class CreateCompanyService {
  async execute({
    cnpj,
    corporate_name,
    fantasy_name,
    active,
    company_type }: ICompanyRequest) {

    const connection = await createConnection();
    const companyRepository = connection.getCustomRepository(CompanyRepositories);

    if (!cnpj) {
      throw new Error("CNPJ incorreto");
    }

    const companyAlreadyExits = await companyRepository.findOne({
      cnpj
    });

    if (companyAlreadyExits) {
      throw new Error("Empresa já existe");
    }

    const company = companyRepository.create({
      cnpj,
      corporate_name,
      fantasy_name,
      active,
      company_type
    });

    await companyRepository.save(company);

    return company;
  }
}

export { CreateCompanyService };