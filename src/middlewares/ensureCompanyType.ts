import { Request, Response, NextFunction } from "express";
import { connect } from "../connections/Connect";
import { UserRepositories } from "../repositories/UserRepositories";

export async function ensureCompanyType(request: Request, response: Response, next: NextFunction) {

  const { user_id } = request;

  const userRepository = (await connect).getCustomRepository(UserRepositories);
  const user = await userRepository.findOne({
    where: {
      id: user_id,
    },
    relations: ["company"],
  });

  //console.log(user);

  if (!user) {
    return response.status(401).json({
      error: "Usuário não encontrado",
    });
  }
  console.log(user);
  if (user.company.company_type === 1) {
    return next();
  }
  else {
    return response.status(401).json({
      error: "Usuário sem privilégio para inclusão",
    });
  }

  return response.status(401).json({
    error: "Usuário não autorizado",
  });
}