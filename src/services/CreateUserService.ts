import { createConnection } from "typeorm";
import { CompanyRepositories } from "../repositories/CompanyRepositories";
import { UserRepositories } from "../repositories/UserRepositories";
import { Utils } from "../libraries/Utils";


interface IUserRequest {
  company_id: number;
  email: string;
  password: string;
  name: string;
  access_level: number;
  active: boolean;
}

class CreateUserService {

  async execute({
    company_id,
    email,
    password,
    name,
    access_level,
    active
  }: IUserRequest) {
    const connection = await createConnection();
    const userRepository = connection.getCustomRepository(UserRepositories);
    const companyRepository = connection.getCustomRepository(CompanyRepositories);
    const utils = new Utils();

    if (!email) {
      throw Error("E-mail não informado");
    }

    if (!utils.emailValido(email)) {
      throw Error("E-mail inválido");
    }

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      throw Error("Usuário já cadastrado");
    }

    const company = await companyRepository.findOne(company_id);

    if (!company) {
      throw Error("Empresa não encontrada");
    }

    const user = userRepository.create({
      company_id,
      email,
      password,
      name,
      access_level,
      active
    });

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };