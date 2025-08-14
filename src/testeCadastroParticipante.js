// Teste de chamada à API /Cadastro/participante
// Este teste utiliza os headers definidos na classe HeaderChamada

const supertest = require('supertest');
const entidades = require('./entidades');
const HeaderChamada = require('./headerChamada');
const obterToken = require('./obterToken');

// Seleciona a entidade para o teste
const entidade = entidades.find(e => e.nome === 'VISAOPREV');

// Monta os headers para a chamada
const rotaHeader = 'Cadastro';
const requestHeader = 'MTI2LDEyMCwxNTcsMjQ1LDE2OSwxOTEsMjExLDQzLDU1LDIzMiwxNzgsMTIzLDE5Myw5MCwxNTksMTM5LDk3LDQ1LDUzLDgyLDIwOCwxNzEsMTU0LDgsNTcsMyw5MCwzMSwxNDYsMjksMTIsNzMsMjQwLDIzMyw2Miw0MiwxNDAsMjUzLDU0LDE2Miw0OSw3NSw3OSwxMTcsMTk2LDM1LDIxMSw3OCw1NywxMywxNTYsMTE4LDE4OSwxMiwxLDExMywxMywxLDM3LDExNiwyMDQsNTYsMjA5LDI1Myw0OSwxMDgsMjEzLDcyLDE3NCwxNjYsMTgxLDExNyw0LDYsMTg3LDQ5LDIxOCw5NSwxODcsMjAwLDE4NSwxNTYsMTcxLDE1NiwyNTAsMTMxLDE1MywxNTksNzAsMTUwLDI0MiwxMjMsODgsMTY0LDIxMiwxMDMsNDcsMjE0LDgyLDE5MiwxNzMsMTgwLDI1Miw2MSwxMzIsMjUxLDE0NCwxMzYsMTIxLDIzMCwxMjYsNTksMTcsMywxMDIsMTQsNjYsMTY4LDQsMTMsMTM5LDEyLDE4NywyMCw0NCwxMzgsMTcxLDE1OQ==';
// Monta os headers sem Authorization, pois será atualizado após obter o token
let headerChamada = new HeaderChamada(entidade, rotaHeader, requestHeader);

// Parâmetros da chamada
const params = {
  pagina: 1,
  tamanho_pagina: 50
};

// ...existing code...
