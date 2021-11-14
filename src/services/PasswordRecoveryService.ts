import { connect } from "../connections/Connect";
import { SendMail } from "../libraries/SendEmail";
import { UserRepositories } from "../repositories/UserRepositories";

class PasswordRecoveryService {
  async execute(email: string) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);
    const user = userRepository.findOne(email);

    if (!user) {
      throw new Error("E-mail não encontrado");
    }

    const sendEmail = new SendMail();
    const mailObj = {
      from: 'tr.rodrigo@gmail.com',
      to: email,
      subject: "Recuperação de senha",
      text: "Clique no link: http://localhost:3000/recovery ou copie e cole em seu navegador \n" +
        "Caso não tenha solicitado, log no sistema e altera a sua senha"
    };

    try {
      return await sendEmail.send(mailObj)
    } catch {
      throw new Error("Erro ao enviar e-mail");
    }
  }
}

export { PasswordRecoveryService };