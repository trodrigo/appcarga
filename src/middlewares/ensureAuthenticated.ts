import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber Token
  const authToken = request.headers.authorization;
  //console.log(authToken);
  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // Verificar se token é valido
  const [, token] = authToken.split(" ");
  try {
    //const decode = verify(token, "f8f21c4819f2cb85934fed91bce3f67e");
    //console.log(decode);
    const { sub } = verify(token, "f8f21c4819f2cb85934fed91bce3f67e") as IPayload;
    request.user_id = parseInt(sub);
    return next();
  } catch (err) {
    return response.status(401).end("Inválido");
  }

  // Recuperar informações do usuário
}