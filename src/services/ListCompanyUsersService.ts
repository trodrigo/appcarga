import { connect } from "../connections/Connect";
import { UserRepositories } from "../repositories/UserRepositories";


class ListCompanyUsersService {
  async execute(company_id: number) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);

    const users = userRepository.find({
      where: {
        company_id: company_id
      }
    })

    return users;
  }
}

export { ListCompanyUsersService };