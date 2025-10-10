// Função para obter o token de autenticação (Bearer) no S4Devs
// Não é necessário criar testes para esta chamada

const supertest = require("supertest");
const entidades = require("./globals/entidades");
const users = require("./globals/users");

// Variável global para armazenar o token Bearer
global.BearerLogin = "";

/**
 * Obtém o token de autenticação para a entidade informada
 * @param {string} username Nome da entidade cadastrada
 * @returns {Promise<void>}
 */
async function obterTokenLogin(username) {
  // Busca a entidade pelo nome
  const user = users.find((u) => u.nome === username);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // Realiza a chamada para obter o token
  const response = await supertest("https://homolapi1.sinqiaprevidencia.com.br")
    .post("/admin/api/auth")
    .set("Accept", "application/json, text/plain, */*")
    .set("Accept-Language", "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")
    .set("Authorization", user.authorization)
    .set("Content-Type","application/json;charset=UTF-8")
    .send("username=vander.evaristo&password=%40Eva216132%232025&grant_type=password")


  // Armazena o token Bearer na variável global
  // Atenção: ajuste conforme o formato do retorno da API
  global.BearerLogin = response.body.access_token || "";
}

module.exports = obterTokenLogin;
