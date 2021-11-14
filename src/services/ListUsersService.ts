import { connect } from "../connections/Connect";
import { UserRepositories } from "../repositories/UserRepositories";


class ListUsersService {
  async execute() {
    const userRepository = (await connect).getCustomRepository(UserRepositories);

    const users = userRepository.find();
    console.log(users);
    return users;
  }
}

export { ListUsersService };