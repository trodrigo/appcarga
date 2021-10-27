import { EntityRepository, Repository } from "typeorm";
import { Company } from "../entities/Company";

@EntityRepository(Company)
class CompanyRepositories extends Repository<Company> { }

export { CompanyRepositories };