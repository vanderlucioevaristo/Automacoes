// Teste automatizado usando Jest
// Arquivo deve terminar com .test.js para ser reconhecido pelo Jest

// Permite certificados autoassinados em ambiente de desenvolvimento
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('Chamada API /Cadastro/participante', () => {
  // Aumenta o timeout para 20 segundos
  jest.setTimeout(60000);
  const supertest = require('supertest');
  const entidades = require('./entidades');
  const HeaderChamada = require('./headerChamada');
  const obterToken = require('./obterToken');

  // Seleciona a entidade para o teste
  const entidade = entidades.find(e => e.nome === 'VISAOPREV');
  const rotaHeader = 'Cadastro';
  const requestHeader = 'MTI2LDEyMCwxNTcsMjQ1LDE2OSwxOTEsMjExLDQzLDU1LDIzMiwxNzgsMTIzLDE5Myw5MCwxNTksMTM5LDk3LDQ1LDUzLDgyLDIwOCwxNzEsMTU0LDgsNTcsMyw5MCwzMSwxNDYsMjksMTIsNzMsMjQwLDIzMyw2Miw0MiwxNDAsMjUzLDU0LDE2Miw0OSw3NSw3OSwxMTcsMTk2LDM1LDIxMSw3OCw1NywxMywxNTYsMTE4LDE4OSwxMiwxLDExMywxMywxLDM3LDExNiwyMDQsNTYsMjA5LDI1Myw0OSwxMDgsMjEzLDcyLDE3NCwxNjYsMTgxLDExNyw0LDYsMTg3LDQ5LDIxOCw5NSwxODcsMjAwLDE4NSwxNTYsMTcxLDE1NiwyNTAsMTMxLDE1MywxNTksNzAsMTUwLDI0MiwxMjMsODgsMTY0LDIxMiwxMDMsNDcsMjE0LDgyLDE5MiwxNzMsMTgwLDI1Miw2MSwxMzIsMjUxLDE0NCwxMzYsMTIxLDIzMCwxMjYsNTksMTcsMywxMDIsMTQsNjYsMTY4LDQsMTMsMTM5LDEyLDE4NywyMCw0NCwxMzgsMTcxLDE1OQ==';
  let headerChamada = new HeaderChamada(entidade, rotaHeader, requestHeader);
  const params = { pagina: 1, tamanho_pagina: 50 };

  it('Contrato Plano inexistente - deve retornar status 400 e mensagem de erro apropriada', async () => {
    // Obtém o token Bearer antes do teste
    await obterToken('VISAOPREV');
    const headers = headerChamada.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest('https://homolapi1.sinqiaprevidencia.com.br')
      .get('/api/Cadastro/participante')
      .set(headers)
      .query(params);

    // Se ocorrer erro, grava o payload no log
    if (response.status !== 200) {
      // Grava informações da chamada no console (será registrado no log HTML)
      console.log('--- PAYLOAD DA CHAMADA COM ERRO ---');
      console.log('URL chamada:', 'https://homolapi1.sinqiaprevidencia.com.br/api/Cadastro/participante');
      console.log('Headers:', headers);
      console.log('Params:', params);
      console.log('Response:', response.body);
      console.log('-----------------------------------');
    }

    // Asserts para validar o resultado
    expect(response.status).toBe(400); // Espera status 400
    expect(response.body).toHaveProperty('mensagem'); // Deve ter a propriedade mensagem
    expect(response.body.mensagem).toBe('Solicitação Imprópria'); // Mensagem específica
    expect(response.body).toHaveProperty('campos'); // Deve ter a propriedade campos
    expect(Array.isArray(response.body.campos)).toBe(true); // campos deve ser array
  });

  it('Informando contratoPlano deve retornar status 200 e objeto Data não vazio quando X-SINQIA-Request está vazio', async () => {
    // Obtém o token Bearer antes do teste
    await obterToken('VISAOPREV');
    // Monta os headers com X-SINQIA-Request vazio
    let headerChamadaVazia = new HeaderChamada(entidade, rotaHeader, '');
    const headers = headerChamadaVazia.getHeaders();
    headers['Authorization'] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest('https://homolapi1.sinqiaprevidencia.com.br/api')
      .get('/Cadastro/participante')
      .set(headers)
      .query(params);

    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(response.body).toHaveProperty('Data'); // Deve ter a propriedade Data
    expect(response.body.Data).toBeDefined(); // Data não deve ser undefined
    expect(response.body.Data).not.toEqual({}); // Data não deve ser objeto vazio
    expect(response.body.Data).not.toEqual([]); // Data não deve ser array vazio
  });

});