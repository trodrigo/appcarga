import { connect } from "../connections/Connect";
import { Request, Response, NextFunction } from "express";
import { UserRepositories } from "../repositories/UserRepositories";
import { User } from "../entities/User";

export async function ensureAccessLevel(request: Request, response: Response, next: NextFunction) {

  const { user_id } = request;

  const userRepository = (await connect).getCustomRepository(UserRepositories);
  const user = await userRepository.findOne(user_id);

  console.log(user);

  if (!user) {
    return response.status(401).json({
      error: "Usuário não encontrado",
    });
  }

  if (user.access_level < 4)
    return next();
  else {
    return response.status(401).json({
      error: "Usuário sem privilégio para inclusão",
    });
  }

  return response.status(401).json({
    error: "Usuário não autorizado",
  });
}