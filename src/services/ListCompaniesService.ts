import { connect } from "../connections/Connect";
import { CompanyRepositories } from "../repositories/CompanyRepositories";


class ListCompaniesService {
  async execute() {
    const companyRepository = (await connect).getCustomRepository(CompanyRepositories);

    const companies = companyRepository.find();
    console.log(companies);
    return companies;
  }
}

export { ListCompaniesService };