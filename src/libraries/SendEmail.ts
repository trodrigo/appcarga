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
      host: "smtp.mail.yahoo.com",
      port: 465,
      secure: true,
      auth: {
        user: "tarciorodrigo@yahoo.com",
        pass: "vnqlrdicsflbyxju",
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
        //console.log("E-mail enviado com sucesso");
        return "E-mail enviado com sucesso";
      }
    });
  }
}