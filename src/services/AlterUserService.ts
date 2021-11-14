import { connect } from "../connections/Connect";
import { CompanyRepositories } from "../repositories/CompanyRepositories";
import { UserRepositories } from "../repositories/UserRepositories";
import { User } from "../entities/User";

interface IUserRequest {
  company_id: number;
  email: string;
  name: string;
  access_level: number;
  active: boolean;
}

class AlterUserService {

  async execute(id: number, {
    company_id,
    email,
    name,
    access_level,
    active = true
  }: IUserRequest) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);
    const companyRepository = (await connect).getCustomRepository(CompanyRepositories);
    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (user.email != email) {
      throw Error("E-mail não pode ser alterado");
    }

    const company = await companyRepository.findOne(company_id);

    if (!company) {
      throw Error("Empresa não encontrada");
    }

    userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        company_id: company_id,
        name: name,
        access_level: access_level,
        active: active
      })
      .where("id = :id", { id: id })
      .execute();

    const userAltered = await userRepository.findOne(id);

    return userAltered;
  }
}

export { AlterUserService };