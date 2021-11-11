import { connect } from "../connections/Connect";
import { CompanyRepositories } from "../repositories/CompanyRepositories";
import { UserRepositories } from "../repositories/UserRepositories";
import { Utils } from "../libraries/Utils";
import { hash } from "bcryptjs";

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
    active = true
  }: IUserRequest) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);
    const companyRepository = (await connect).getCustomRepository(CompanyRepositories);
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

    const passwordHash = await hash(password, 8);
    const user = userRepository.create({
      company_id,
      email,
      password: passwordHash,
      name,
      access_level,
      active
    });

    await userRepository.save(user);

    return user;
  }
}

export { CreateUserService };