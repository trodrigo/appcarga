import { Request, Response } from "express";
import { connect } from "../connections/Connect";
import { UserRepositories } from "../repositories/UserRepositories";
import { ListCompanyUsersService } from "../services/ListCompanyUsersService";

class ListCompanyUsersController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const userRepository = (await connect).getCustomRepository(UserRepositories);
    const user = await userRepository.findOne({
      where: {
        id: user_id,
      }
    });

    if (user) {

      const listCompanyUsersService = new ListCompanyUsersService();

      const users = await listCompanyUsersService.execute(user?.company_id);

      return response.json(users);
    }
    else {
      throw Error("Usuário não encontrado");
    }
  }
}

export { ListCompanyUsersController };