import { connect } from "../connections/Connect";
import { CompanyRepositories } from "../repositories/CompanyRepositories";
import { Utils } from "../libraries/Utils";
import { UserRepositories } from "../repositories/UserRepositories";

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
    active = true,
    company_type }: ICompanyRequest) {

    //const connection = await createConnection();
    const companyRepository = (await connect).getCustomRepository(CompanyRepositories);
    const userRepository = (await connect).getCustomRepository(UserRepositories);
    const utils = new Utils();

    const userExists = await userRepository.findOne()

    if (!cnpj) {
      throw new Error("CNPJ incorreto");
    }

    if (!utils.validaCnpj(cnpj)) {
      throw new Error("CNPJ inválido");
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