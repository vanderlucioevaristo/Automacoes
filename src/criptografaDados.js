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

  // Realiza a chamada para obter o token
    const response1 = await supertest("https://homolapi1.sinqiaprevidencia.com.br")
    .post("/admin/api/admincliente/encrypt")
    .set("Accept", "application/json, text/plain, */*")
    .set("Accept-Language", "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")
    .set("Content-Type","application/json;charset=UTF-8")
    .set("Authorization", `Bearer ${global.BearerLogin}`)
    .send(`{"key":"PFJTQUtleVZhbHVlPjxNb2R1bHVzPnNjYStwdS9PaTVQTjB5N3A3cDN6SVVqL0pVVjNkV2VLODJZaWt5ZVZIWmVnb0xhSWFXQVFUNk1pMUR2OWRFek5yN21mcnNoOUhCcDg3bVlDa3FkUkE3c2NZZTZpTFh1dC9TdkF1a0lEcStLclVmUVNRTzFIYTFjMWdWSDA4S1BHRnBsUitQWHVrazhJanIyMG1OQWxERHpxaFY4MHErQUlQV0xlZFBTZWdpVT08L01vZHVsdXM+PEV4cG9uZW50PkFRQUI8L0V4cG9uZW50PjwvUlNBS2V5VmFsdWU+","queryString":"65645/9570","body":{"salario":5000}}`)


    const response = await supertest("https://homolapi1.sinqiaprevidencia.com.br")
    .post("/admin/api/admincliente/encrypt")
    .set("Accept", "application/json, text/plain, */*")
    .set("Accept-Language", "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")
    .set("Authorization", `Bearer ${global.BearerLogin}`)
    .set("Content-Type","application/json;charset=UTF-8")
    .send(sendBody)


  // Armazena os dados criptografados
  const teste = response1.body.m_Item1;
  const teste1 = response1.body.m_Item2;
  global.queryStringCripto = response.body.m_Item1;
  global.bodyStringCripto = response.body.m_Item2;
}

module.exports = criptografaDados;
