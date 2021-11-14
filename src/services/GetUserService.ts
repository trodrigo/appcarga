import { connect } from "../connections/Connect";
import { UserRepositories } from "../repositories/UserRepositories";


class GetUserService {
  async execute(id: number) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);

    const user = userRepository.findOne({
      where: {
        id: id
      }
    });

    return user;
  }
}

export { GetUserService };