import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { connect } from "../connections/Connect";
import { UserRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);

    const user = await userRepository.findOne({
      email
    });

    if (!user) {
      throw new Error("E-mail/Password incorreto(s)")
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw Error("E-mail/Password incorreto(s)")
    }
    // Gerar o token
    const token = sign({
      email: user.email,
      accessLevel: user.access_level
    }, "f8f21c4819f2cb85934fed91bce3f67e", {
      subject: user.id.toString(),
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService };