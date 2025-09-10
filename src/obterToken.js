// Função para obter o token de autenticação (Bearer) para uma entidade
// Não é necessário criar testes para esta chamada

const supertest = require("supertest");
const entidades = require("./globals/entidades");

// Variável global para armazenar o token Bearer
global.Bearer = "";
global.baseUrl = "https://homolapi1.sinqiaprevidencia.com.br/api";
global.apiResponse = {};
global.virtualResponse = {};

/**
 * Obtém o token de autenticação para a entidade informada
 * @param {string} nomeEntidade Nome da entidade cadastrada
 * @returns {Promise<void>}
 */
async function obterToken(nomeEntidade) {
  // Busca a entidade pelo nome
  const entidade = entidades.find((e) => e.nome === nomeEntidade);
  if (!entidade) {
    throw new Error("Entidade não encontrada");
  }

  // Realiza a chamada para obter o token
  const response = await supertest("https://homolapi1.sinqiaprevidencia.com.br")
    .post("/auth/gettoken")
    .set("Authorization", entidade.basic) // Passa o parâmetro basic
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set("X-SINQIA-Client-Key", entidade.clientKey) // Passa o parâmetro clientKey
    .send("grant_type=password"); // Body x-www-form-urlencoded

  // Armazena o token Bearer na variável global
  // Atenção: ajuste conforme o formato do retorno da API
  global.Bearer = response.body.access_token || "";
}

module.exports = obterToken;
