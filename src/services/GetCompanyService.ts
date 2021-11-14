import { connect } from "../connections/Connect";
import { CompanyRepositories } from "../repositories/CompanyRepositories";


class GetCompanyService {
  async execute(id: number) {
    const companyRepository = (await connect).getCustomRepository(CompanyRepositories);

    const company = companyRepository.findOne({
      where: {
        id: id
      }
    });

    return company;
  }
}

export { GetCompanyService };