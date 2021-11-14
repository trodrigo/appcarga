import { connect } from "../connections/Connect";
import { CompanyRepositories } from "../repositories/CompanyRepositories";
import { Utils } from "../libraries/Utils";
import { request } from "express";
import { Company } from "../entities/Company";

interface ICompanyRequest {
  cnpj: string;
  corporate_name: string;
  fantasy_name: string;
  active: boolean;
  company_type: number;
}
class AlterCompanyService {
  async execute(id: number, {
    cnpj,
    corporate_name,
    fantasy_name,
    active = true,
    company_type }: ICompanyRequest) {

    //const connection = await createConnection();
    const companyRepository = (await connect).getCustomRepository(CompanyRepositories);
    const company = await companyRepository.findOne(id);

    const utils = new Utils();

    if (!company) {
      throw new Error("Empresa não encontrada");
    }

    if (company.cnpj != cnpj) {
      throw new Error("CNPJ não pode ser alterado");
    }

    if (!cnpj) {
      throw new Error("CNPJ incorreto");
    }

    if (!utils.validaCnpj(cnpj)) {
      throw new Error("CNPJ inválido");
    }

    companyRepository.merge(company as Company, {
      cnpj,
      corporate_name,
      fantasy_name,
      active,
      company_type
    });

    await companyRepository.save(company as Company);

    return company;
  }
}

export { AlterCompanyService };