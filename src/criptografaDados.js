// Função para obter o token de autenticação (Bearer) no S4Devs
// Não é necessário criar testes para esta chamada

const supertest = require("supertest");
//const entidades = require("./globals/entidades");
const users = require("./globals/users");
const obterTokenLogin = require("./obterTokenLogin");


// Variável global para armazenar o token Bearer
//global.BearerLogin = "";
//global.baseUrl = "https://homolapi1.sinqiaprevidencia.com.br/api";
global.queryStringCripto = "";
global.bodyStringCripto = "";

/**
 * Obtém o token de autenticação para a entidade informada
 * @param {string} userName Usuário para autenticar e criptografar
 * @param {string} queryString Parâmetros a serem criptogerafados
 * @param {string} bodyString Body a ser criptografado
 * @param {string} publicKey Chave pública da entidade
 * @returns {Promise<void>}
 */
async function criptografaDados(userName,queryString, bodyString, publicKey) {

    await obterTokenLogin(userName);

   // Monta o body para a chamada
   const dados ={
    "key":publicKey,
    "queryString": queryString,
    "body": bodyString
   }
   const sendBody = JSON.stringify(dados);

    const response = await supertest("https://homolapi1.sinqiaprevidencia.com.br")
    .post("/admin/api/admincliente/encrypt")
    .set("Accept", "application/json, text/plain, */*")
    .set("Accept-Language", "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")
    .set("Authorization", `Bearer ${global.BearerLogin}`)
    .set("Content-Type","application/json;charset=UTF-8")
    .send(sendBody)


  // Armazena os dados criptografados
  global.queryStringCripto = response.body.m_Item1;
  global.bodyStringCripto = response.body.m_Item2;
}

module.exports = criptografaDados;
