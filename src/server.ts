import express, { response } from "express";
import { request } from "http";

const app = express();

/**
 * Métodos
 * GET    => Buscar uma informação
 * POST   => Inserir ou criar uma informação 
 * PUT    => Alterar uma informação
 * DELETE => Deletar uma informação
 * PATCH  => Alterar uma informação específica
 */

/**
 * Tipos de parametros
 * Routes Params => http://localhost:3000/produtos/47555552
 * 
 * Query Params  => http://localhost:3000/produtos?name=teclado&discription=bomestado
 * 
 * Body Params   => {
 *   "name": "teclado",
 *   "description": "bomestado"
 * }
 */

app.get("/carga", (request, response) => {
    return response.send("APP Carga");
})

app.post("/carga", (request, response) => {
    return response.send("APP Carga - Método Post")
})

app.listen(3000, function () { console.log("Server running - app carga") });