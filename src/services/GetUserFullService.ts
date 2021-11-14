import { connect } from "../connections/Connect";
import { UserRepositories } from "../repositories/UserRepositories";


class GetUserFullService {
  async execute(id: number) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);

    const user = userRepository.findOne({
      where: {
        id: id
      },
      relations: ["company"],
    });

    return user;
  }
}

export { GetUserFullService };