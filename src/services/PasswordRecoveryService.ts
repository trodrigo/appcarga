import { connect } from "../connections/Connect";
import { SendMail } from "../libraries/SendEmail";
import { UserRepositories } from "../repositories/UserRepositories";

class PasswordRecoveryService {
  async execute(email: string) {
    const userRepository = (await connect).getCustomRepository(UserRepositories);
    const user = await userRepository.findOne(email);
    console.log(email);
    if (!user) {
      throw Error("E-mail não encontrado");
    }

    const sendEmail = new SendMail();
    const mailObj = {
      from: 'tarciorodrigo@yahoo.com',
      to: email,
      subject: "Recuperação de senha",
      text: "Clique no link: http://localhost:3000/recovery ou copie e cole em seu navegador \n" +
        "Caso não tenha solicitado, log no sistema e altera a sua senha"
    };

    try {
      const message = await sendEmail.send(mailObj);
      console.log(message);
      return message;
    } catch {
      throw new Error("Erro ao enviar e-mail");
    }
  }
}

export { PasswordRecoveryService };