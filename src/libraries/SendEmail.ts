import { createTransport } from "nodemailer";

interface ISendMail {
  from: string,
  to: string,
  subject: string,
  text: string
}
export class SendMail {
  async send({ from, to, subject, text }: ISendMail) {
    const sender = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: "teste@gmail.com",
        pass: "teste@123",
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    const emailSender = {
      from,
      to,
      subject,
      text
    };

    sender.sendMail(emailSender, (error) => {
      if (error) {
        //console.log(error);
        throw new Error(error.message);
      } else {
        console.log("E-mail enviado com sucesso");
        return "E-mail enviado com sucesso";
      }
    });
  }
}