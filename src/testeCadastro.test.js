// Teste automatizado usando Jest
// Arquivo deve terminar com .test.js para ser reconhecido pelo Jest

// Permite certificados autoassinados em ambiente de desenvolvimento
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const path = require("path");
const fs = require("fs");
const PayloadChamada = require("./globals/payloadChamada");
const supertest = require("supertest");
const entidades = require("./globals/entidades");
const HeaderChamada = require("./globals/headerChamada");
const obterToken = require("./obterToken");

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Cadastro";

jest.setTimeout(20000);

describe("Suite de Teste API - Cadastros", () => {
  const rotaUrl = "/Cadastro/perfilinvestimento";

  it("Cadastro - Get/Cadastro/perfilinvestimento - Período maior que 1 ano- Status code 400", async () => {

    //Período enviado na consulta 2004-01-01/2025-08-31
    const sinqiaRequestHeader ="MTYyLDIwOSwxODcsMTk3LDE2MiwyNDcsMjAxLDIyMywwLDI0NSwxNCwxMDksNDcsMzcsNTcsMjUwLDI1MiwyMDgsMTEyLDIwMCw5NCw0NCwyMjAsMTIwLDY0LDExNCwyMTIsMjE0LDI1NSwxNjgsMTYwLDE2OCwxMzQsMjQxLDI1MCwxOTEsMjI3LDczLDEwNCwyNDksMjI3LDMsODEsMTYzLDMzLDI1MiwyMzEsMTYsMTQ3LDgwLDIwMiw3NCw0MiwxMDAsMzMsNjMsMjQ3LDE0MSw2MCwxNjcsMTc1LDEyLDU2LDE5NCw5LDE2LDc4LDg5LDYzLDE3MSwxNzMsMjM3LDE4MSwyMzEsMjksMTk0LDY2LDE0MywxNTIsMTk0LDIwMiwxNzUsMjQsMjA5LDE2OCw4NSwxOTMsMTM0LDI0MCwyMDQsMjUzLDY1LDI2LDIwNSwxMDIsMzEsMTE3LDIzNiw1MSw4MSwxMDQsODUsMTkwLDEwMSwxMCw5MiwxNiwxNiwxNDUsMTgwLDIyMCw5MSw2NSwxNTEsMTY3LDIwMyw1NCw4NCw5NywxNDksODAsNzAsMTc5LDEwNSwyNDEsMTE1LDI0MywzOQ==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = { pagina: 1, tamanhoPagina: 50 };

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers)
      .query(params);


    if (response.status !== 400) {
      const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body);
      console.log(payload.toString());
      // Grava o payload no arquivo de log de execução
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    } 
    
    // Asserts para validar o resultado
    expect(response.status).toBe(400); // Espera status 400
    expect(response.body).toHaveProperty("mensagem"); // Deve ter a propriedade mensagem
    expect(response.body.mensagem).toBe("Solicitação Imprópria"); // Mensagem específica
    expect(response.body).toHaveProperty("campos"); // Deve ter a propriedade campos
    expect(Array.isArray(response.body.campos)).toBe(true); // campos deve ser array
  });

  it("Cadastro - Get/Cadastro/perfilinvestimento - Paginação com mais de 50 páginas - Status code 400", async () => {

    //Período enviado na consulta 2004-01-01/2025-08-31
    const sinqiaRequestHeader ="MTY1LDU5LDIxNSwyNDgsMTY2LDE5MCw0OCwyNiwyMTgsMTMyLDI1MywxMDgsMjQxLDEwMywxMDcsMTA3LDU4LDI4LDcyLDQsMTU3LDczLDE4MywyNDksNDIsODQsNDgsMTMsMjEzLDgsNjEsMjgsODQsMTYwLDExLDI4LDEwMCw1NSwyMzAsMjUzLDI1NSwxOTMsMTk0LDE2MCw3MCwxOTMsMTA1LDE1MywxNDksODQsMjAxLDEzMSwyMzksMjksMTkwLDk3LDE1OCw2NCw0LDIyNywxLDIyOCwxMDYsMjMyLDEwOCwyMzQsMjEsMjAyLDI3LDQ0LDE2LDE4OSw4MSwyNTQsMTM0LDMyLDEyNSwxMzEsMjM0LDEzNCw4Myw4OCw3MiwxNzgsMTU5LDU3LDE1Nyw0Miw5MSw4MCwxMjksNDYsMjIwLDIyNSw3OSwxNjQsOTEsMTExLDYyLDcxLDE1MywyMjIsMzIsNzEsNDMsOTYsMTcyLDExOCw5MSw1OCwyMzIsOTEsMjM0LDIsMTc3LDQxLDEsMTA3LDI0MiwyMzMsMTcsOTAsMTQ0LDE4MSw5LDIwNiwxNTUsNDQ=";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = { pagina: 1, tamanhoPagina: 60 };

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers)
      .query(params);

    if (response.status !== 400) {
      const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);
      console.log(payload.toString());
      console.log(response.statusCode);
      // Grava o payload no arquivo de log de execução
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    } 
    
    // Asserts para validar o resultado
    expect(response.status).toBe(400); // Espera status 400
    expect(response.body).toHaveProperty("mensagem"); // Deve ter a propriedade mensagem
    expect(response.body.mensagem).toBe("Solicitação Imprópria"); // Mensagem específica
    expect(response.body).toHaveProperty("campos"); // Deve ter a propriedade campos
    expect(response.body.campos[0].codigo_erro).toBe("erro-cad-1005"); // Verifica o valor do código de erro
    expect(Array.isArray(response.body.campos)).toBe(true); // campos deve ser array
  });

  it("Cadastro - Get/Cadastro/perfilinvestimento - Com campos opcionais nulos - Status code 200", async () => {

    //Período enviado na consulta 2025-01-01/2025-08-31/null/null
    const sinqiaRequestHeader ="NzQsMjMxLDE1NywyMDksMTMwLDEwMiwxNDgsMjA1LDExMywxNTYsOTAsMTYyLDEwNSw0NSwxODcsMTI4LDk2LDExNSwxNTEsNDIsMzEsMTM3LDIwMiw1MiwyNTUsMTczLDI1LDI1NCwxODQsNzcsMjE0LDIwMSwxNzksMjE2LDc2LDE3NSw4MSwxNjgsMzgsNzQsOTAsMzUsNzUsMjA2LDMsMTYsMjQ4LDE3MiwyMDEsMTQ3LDI0OCwyMDcsMjQ3LDE4MywxMzgsODAsMTcsMTM5LDIzMyw2NCwyMDIsMTIzLDE0MywzNyw1MiwxNSwxMjEsNTksMTUyLDExMSwyNDcsNiwyMzMsMjIwLDE0LDIwMywxNDQsNjAsMTE3LDI1NSwyMyw3MywyNiwyNDcsMTU3LDc3LDIwNCwxNzksMTU0LDIxNiwxMjEsMTE5LDU2LDIwNSw4LDkwLDQ5LDIyNSw2MSw0MywyMzIsMTUsMTA2LDIxMSw3Nyw4LDIxNywxNzksNTksMTUwLDE5NCw4NCwyMzcsMTUyLDExOSw4OCwxODMsMTU2LDI0NCw2NiwxMjYsODEsMjAyLDI1MCwyMTMsMTY5LDkzLDIzNw==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = { pagina: 1, tamanhoPagina: 50 };

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers)
      .query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
      // Grava o payload no arquivo de log de execução
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }

    
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
    expect(response.body.Data[0]).toHaveProperty("Nome");
    expect(response.body.Data[0]).toHaveProperty("CPF"); 
    expect(response.body.Data[0]).toHaveProperty("Banco");
    expect(response.body.Data[0]).toHaveProperty("Agencia");
    expect(response.body.Data[0]).toHaveProperty("NumeroContaBancaria");
    expect(response.body.Data[0]).toHaveProperty("DigitoVerificadorContaBancaria");
    expect(response.body.Data[0]).toHaveProperty("NomeSituacao");
    expect(response.body.Data[0]).toHaveProperty("DataSolicitacao");
    expect(response.body.Data[0]).toHaveProperty("NomeSituacao");    
    expect(response.body.Data[0]).toHaveProperty("DataCompetencia");
    expect(response.body.Data[0]).toHaveProperty("DataAtualizacao");    
    expect(response.body.Data[0]).toHaveProperty("NomeSolicitante");
    expect(response.body.Data[0]).toHaveProperty("UsuarioSolicitante");

  });

  it("Cadastro - Get/Cadastro/perfilinvestimento - Sem os  campos opcionais nulos - Status code 200", async () => {

    //Período enviado na consulta 2025-01-01/2025-08-31
    const sinqiaRequestHeader ="MTA5LDE1NSwyNCwyNDksMjAxLDE0MSwxMDcsMjM1LDIwMSwyMzYsODIsMjExLDI0NCw3MiwyMDIsMjM0LDE0NiwxNDcsNTAsMjMwLDEwMSw5MCwyMjEsMTczLDIxMiwxMjAsMTksMTUsNTYsMjUsMjE3LDU3LDExOCw4MywxMDIsMTcxLDIxMSwxODEsMTA3LDUzLDIxOSwxMDYsMTQ0LDIzNiwxMjMsNzEsNTcsMTI5LDE2MywxMCwxMTQsMTc2LDE1MCw5MCwxMTcsMTU4LDE3NiwyMDksMTQ2LDI0LDEwNCwxNzYsMTE2LDE5MSwyMzQsMTUyLDIxMywxNzUsMjM1LDYsMTUxLDI1NSw2OCw0OCwzOCwxMDQsMjA4LDg0LDIwNSwxNCwxODAsMTEyLDE1MSwxODUsMTYsMTA5LDg0LDI1MiwyMTQsMTY3LDEwNywxNDAsMTg4LDUsMTk5LDIyMywxODUsMjIyLDEwMSw5MywyNDQsMTgyLDYxLDE0MCwyNTAsNjMsODIsMTc5LDQzLDM4LDEyMiwxLDIzNiwyNCw2MCwxODYsMjM0LDIwLDk0LDE0NiwxMDMsMTEyLDY5LDIsMTcsMzksMjE2LDE1NQ==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = { pagina: 1, tamanhoPagina: 50 };

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers)
      .query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
      // Grava o payload no arquivo de log de execução
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }

    
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
    expect(response.body.Data[0]).toHaveProperty("Nome");
    expect(response.body.Data[0]).toHaveProperty("ContratoParticipante"); 
    expect(response.body.Data[0]).toHaveProperty("CPF");
    expect(response.body.Data[0]).toHaveProperty("Matricula");
    expect(response.body.Data[0]).toHaveProperty("Empregador");
    expect(response.body.Data[0]).toHaveProperty("PerfilAtual");
    expect(response.body.Data[0]).toHaveProperty("DataUltimaAlteracao");
    expect(response.body.Data[0]).toHaveProperty("DataInicioVigencia");
    expect(response.body.Data[0]).toHaveProperty("NomeSituacao");    
    expect(response.body.Data[0]).toHaveProperty("DataSolicitacao");
    expect(response.body.Data[0]).toHaveProperty("DataCompetencia");    
    expect(response.body.Data[0]).toHaveProperty("DataAtualizacao");
    expect(response.body.Data[0]).toHaveProperty("NomeSolicitante");
    expect(response.body.Data[0]).toHaveProperty("UsuarioSolicitante");
  });

  it("Cadastro - Get/Cadastro/perfilinvestimento - Com contrato participante - Status code 200", async () => {

    //Período enviado na consulta 2025-01-01/2025-08-31/96751/null
    const sinqiaRequestHeader ="NTksODAsNTcsMjI3LDE1MywxNzQsMTAzLDIwNCwxNTYsMjEsMTgwLDc0LDE5Nyw5Myw0MSw4OCwxNTUsOTMsMjEwLDI1MCwxMzMsODMsMTQ4LDI5LDc3LDIxNyw3NSw0LDI3LDEzMywxODAsNzQsMTYsMTAxLDE1MCwxNzcsMjEsMjE0LDIzMywxNjQsNCwwLDE3Myw4MSw0MCwyNTMsODcsMTU0LDE2NCwxMTksNjgsMTc2LDksNTIsNTcsMjM3LDE5NywxMzIsMzksMTg1LDIwNiwyNDIsNSwyNDksOSwxNzAsNDEsMjMxLDgxLDI0MSwxNjksMTgyLDE3OSwxNDksMjcsMjA1LDE3NCwyMTYsMTI1LDE0MCw2MiwyNTIsOTEsMTgsNTcsMjM4LDEyOSwyNywyMjEsODIsNTIsOTMsMjI2LDYsMTcyLDIyNywxNSwyMzQsMzYsMTM2LDk2LDIxNSwxOTUsNTYsNzIsMTgwLDgyLDI0LDE0OCwyNDgsMjA3LDE3NSwyNTUsMTA1LDY2LDMsMTU3LDEzMiwyOSwxMDcsMjEyLDUxLDEzLDE5MywyMjQsMTgyLDY3LDIxMg==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = { pagina: 1, tamanhoPagina: 50 };

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers)
      .query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
    // Grava o payload no arquivo de log de execução
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }

    
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
    expect(response.body.Data[0]).toHaveProperty("Nome");
    expect(response.body.Data[0]).toHaveProperty("ContratoParticipante"); 
    expect(response.body.Data[0]).toHaveProperty("CPF");
    expect(response.body.Data[0]).toHaveProperty("Matricula");
    expect(response.body.Data[0]).toHaveProperty("Empregador");
    expect(response.body.Data[0]).toHaveProperty("PerfilAtual");
    expect(response.body.Data[0]).toHaveProperty("DataUltimaAlteracao");
    expect(response.body.Data[0]).toHaveProperty("DataInicioVigencia");
    expect(response.body.Data[0]).toHaveProperty("NomeSituacao");    
    expect(response.body.Data[0]).toHaveProperty("DataSolicitacao");
    expect(response.body.Data[0]).toHaveProperty("DataCompetencia");    
    expect(response.body.Data[0]).toHaveProperty("DataAtualizacao");
    expect(response.body.Data[0]).toHaveProperty("NomeSolicitante");
    expect(response.body.Data[0]).toHaveProperty("UsuarioSolicitante");
  });

  it("Cadastro - Get/Cadastro/perfilinvestimento - Filtro por situação - Status code 200", async () => {

    //Período enviado na consulta 2025-01-01/2025-08-31/null/2 (Concluído)
    const sinqiaRequestHeader ="MTIyLDg1LDc3LDIzNywxNTMsMjAzLDEzMiwzNCw2NiwxLDUsNjAsMiwyMywzLDE5MCwyMyw4OSwxNzgsMTM5LDExNCwxMzUsODYsMTM4LDIwOCwxMDcsMTMyLDE2NywyMjYsMTE0LDIyMyw4NiwxOTcsNiwyNSwxMzksNDAsNDYsMTMwLDI0MywwLDE1MywyNTMsMTksMTE0LDEyOCw3NywxNTYsMTQxLDUsMTQsMjM5LDgzLDE0MSwzMywxOTYsMjE4LDIwNiwyNDEsNTAsMjMxLDEyNSw5NSwxNTgsMjM2LDc2LDE0OCwxNzAsMjAyLDEwNSw0Myw2NywyMCwxODUsODksMCwyMTUsMTY0LDIxLDkzLDE1MSwzLDEzNiw4NiwxMzgsNDYsMTU4LDIxOCwxODMsMTIyLDQ2LDEyLDUyLDI2LDE3MSwxNDAsNjAsNzQsMjA0LDE0NywxNywxMDIsMTIsNTIsMTQ4LDk4LDI1MiwyMCwxNzgsMTExLDIyNywxNjIsMjM3LDkyLDM0LDEzNSwyNDAsMjAyLDE1OCw2MSwxOTMsMjA2LDE2OSwxMDUsMTE4LDEwLDIwNSw1NA==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = { pagina: 1, tamanhoPagina: 50 };

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers)
      .query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
    // Grava o payload no arquivo de log de execução
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }

    
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
    expect(response.body.Data[0]).toHaveProperty("Nome");
    expect(response.body.Data[0]).toHaveProperty("ContratoParticipante"); 
    expect(response.body.Data[0]).toHaveProperty("CPF");
    expect(response.body.Data[0]).toHaveProperty("Matricula");
    expect(response.body.Data[0]).toHaveProperty("Empregador");
    expect(response.body.Data[0]).toHaveProperty("PerfilAtual");
    expect(response.body.Data[0]).toHaveProperty("DataUltimaAlteracao");
    expect(response.body.Data[0]).toHaveProperty("DataInicioVigencia");
    expect(response.body.Data[0]).toHaveProperty("NomeSituacao");    
    expect(response.body.Data[0]).toHaveProperty("DataSolicitacao");
    expect(response.body.Data[0]).toHaveProperty("DataCompetencia");    
    expect(response.body.Data[0]).toHaveProperty("DataAtualizacao");
    expect(response.body.Data[0]).toHaveProperty("NomeSolicitante");
    expect(response.body.Data[0]).toHaveProperty("UsuarioSolicitante");
  });

  it("Cadastro - Get/Cadastro/perfilinvestimento - Sem dados de retorno - Status code 200", async () => {

    //Período enviado na consulta 2025-01-01/2025-08-31/2/2 
    const sinqiaRequestHeader ="MTYyLDU4LDIxNywxODQsMzgsMjI4LDIyOSw5MSwxNzYsMjEyLDc2LDExMCwxODEsMTUxLDI0MCwxOTgsMjEwLDg0LDIyNSwyMTcsNTYsMTE0LDE3OCwyMTQsMjIxLDE5NCwxOTYsNzMsNDQsNCwxNzYsMjE1LDEyOSw3NiwxNzYsMTc5LDIwMywyNCwxMjAsMCwyMzcsMTI5LDEzNyw2MCwxNDgsMTczLDIzNCwxNzUsMTg2LDEyMiw4NSw1OCw5MSwxMyw1NywxODgsNzIsMTE2LDE4Nyw4Niw2MSwyMjYsNSwxMzAsMjE0LDE5MSwzNSw4NywyMDUsMTMzLDIzLDE4MCw1MCwyMiwxODAsMTQyLDE2NiwxMiwxOTMsMTgwLDc4LDE0MiwxOCwxMywxMDcsMTQ4LDE1NiwxMTgsNTcsNDUsMTAxLDY3LDgxLDEwNiwxODQsMjA3LDc1LDE3OCwyMDIsMTE2LDE2MiwxOTUsNDIsOTEsMjE2LDU0LDEwNywxNjIsMTAyLDIwMCw5OSw3MiwxODcsMTExLDIwNyw3Nyw0OSw4MywxMTAsNzUsOTgsNDYsMTQ3LDQ5LDEzMCwyMTMsMTY1LDEyOA==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = { pagina: 1, tamanhoPagina: 50 };

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers)
      .query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }
      // Grava o payload no arquivo de log de execução

    
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
    expect(response.body.Data.length).toBe(0); // Verifica que não há dados retornados  
  });
});

describe("Suite de Teste API -  Cadastros V2", () => {
  const rotaUrl = "/Cadastro/v2/pessoas_fisicas_associadas/participante";

  it("Cadastro - Get/Cadastro/v2/pessoas_fisicas_associadas/participante - Dados Válidos - Status code 200",async () => {
        //contratoParticipante/tipoAssociacaoPessoaFisicaID - 83238/11
    const sinqiaRequestHeader ="NzQsMTQwLDg3LDIzOSwxNDgsMjExLDg3LDY4LDEyMiwyMzcsMTQ3LDE0NiwxNjYsMTcxLDIxOCwxNzUsMTQ5LDI2LDE0OSwyNTQsMjQ4LDE3OSw3NCwxNzQsMTE2LDM5LDEzNCwxNTgsMTYwLDEyNCw0NSwxMDksODUsMjIyLDE2MiwyMDAsNzcsODIsMjMyLDcyLDQ1LDE2LDEzLDI4LDE0NCwxMzgsMTE0LDY0LDIyMiwyMjIsMjI2LDIwMyw0MiwyMzMsMTQ3LDIxNSw3NCwyNSwxOTcsMjM3LDIxNiwxNzEsMjA4LDE1NCwxMDgsNjUsMjAzLDI4LDg1LDE2MCw1NCwxMjIsMTgyLDExMCwxNjMsMTA5LDYyLDI0NywxMTUsMTg5LDE2NCwyNSwyMjksMTAsMTU5LDE0MywzNCwyMDcsMjUzLDE3MSwzMSw5NywxNDMsNDEsMTA2LDE5OSwyMDksNDgsMjI4LDk1LDE0OSwyMzYsNjEsMTkxLDU5LDMwLDE2OSwyMTEsMTk3LDgyLDEyNyw5NSwxNTMsMTY4LDU5LDIwMCwyMzcsMTgwLDgxLDU5LDE1Niw2NCwyMjcsMjAyLDIyNCw3NCwxODEsMjIx";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = {};

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);
      //.query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }
      // Grava o payload no arquivo de log de execução

    
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
    expect(response.body.Data[0]).toHaveProperty("PessoaFisicaId");
    expect(response.body.Data[0]).toHaveProperty("Nome"); 
    expect(response.body.Data[0]).toHaveProperty("Cpf");
    expect(response.body.Data[0]).toHaveProperty("DataNascimento");
    expect(response.body.Data[0]).toHaveProperty("DataInicio");
    expect(response.body.Data[0]).toHaveProperty("DataFim");
    expect(response.body.Data[0]).toHaveProperty("TipoVinculo");
  });

  it("Cadastro - Get/Cadastro/v2/pessoas_fisicas_associadas/participante - Dados Nulos - Status code 200",async () => {
    //contratoParticipante/tipoAssociacaoPessoaFisicaID - 83238/11
    const sinqiaRequestHeader ="MTE5LDE3Myw2Nyw4LDQ5LDEwLDg3LDI0MSw4LDUyLDE5MSw2OCwyMzQsNDIsMTM0LDIzMywxMTYsMTk1LDk5LDE5MywxNjgsMTkyLDI4LDEwLDE2NSwxODEsNzEsMzQsMjAsMTU1LDE1MCw1OSwyMDIsMTI5LDIyMCwxODUsNTcsMTkzLDUsNTgsMTYyLDE5NiwxOTYsNzIsMTAwLDkwLDM4LDU5LDYsNjUsMSwxNDQsMTkzLDEwNSwxNjUsMTQxLDc0LDE5NiwxMTYsMTYwLDEyMiwxMTQsMjM2LDEzOSwxOTcsNTMsMTE3LDEyMCwxOTQsNTMsMzYsNjYsMjAxLDY2LDIyLDI0NCwyMjMsMjUsNDksMTkyLDI0MCwxNTksMjIzLDIyMSwxNzIsMTY2LDk3LDIyMiwxMzIsMTg1LDQ0LDIyNCwxMzQsMTgxLDIxNywxODYsNzgsMTg2LDg4LDExMiwyMjYsODAsNTEsMTYwLDIyMiw1Nyw3OCwyMDYsMCwxNSwyMzgsNzYsODgsMjQ0LDE2OSwxMTIsMjMyLDE4OSwxODIsOCwxOTIsMTA4LDE0OCwxNTQsNzEsOTAsMzcsMTkw";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = {};

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);
      //.query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }
   
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(response.body.Message).toBe("The request is invalid."); 
  });

  it("Cadastro - Get/Cadastro/v2/pessoas_fisicas_associadas/participante - contratoParticipante válido  e tipoAssociacaoPessoaFisicaID nulo - Status code 200",async () => {
    //contratoParticipante/tipoAssociacaoPessoaFisicaID - 83238/11
    const sinqiaRequestHeader ="MTYsMTc5LDQzLDE4Nyw5Myw1NSwxMzMsMTcsNjksMTgxLDQzLDE1NiwyMTQsMjQwLDIwNCw1NSw4MCwyMCwyMDQsMjQwLDEwMywyMTksMjEyLDk0LDI1MiwxNDEsMjI3LDU3LDE3NiwyMDcsMjI4LDE4NywyMzIsMTcyLDE2LDE3NywzNCwzMiwzOSw3MSw3NSwxMCwxODAsNjksMjAsODksMjQ1LDEzNSwxNjMsMTQwLDIwMiwyMTIsNDAsNDMsMzcsMTU5LDEzMywyMjcsOTQsMjUyLDEyMCwxMjUsNzgsMjMxLDE2MywxMzYsMTM2LDEzNSwyMDMsMTIyLDYxLDExNiwxNTgsOTQsODUsNjAsMTUwLDEzNSwyMDIsMTM3LDk0LDEzNSw3MSwyNTAsNzMsMjAxLDQ5LDg5LDEyLDE3MywxMDYsMjQ4LDQsMTg0LDQ2LDE0NCwxNzAsMCwxMSwyMjcsNzMsMTI0LDEyMSwxMzEsODcsMjIwLDE2OSw0MSwyMjcsMTM4LDQwLDIyNSw4NCwxNDUsMjIyLDQyLDIwMiwxODgsODAsMjU0LDI5LDgyLDI1MCwyNTUsMTYzLDE1MywyMTAsMjI2";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = {};

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);
      //.query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }
   
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
    expect(response.body.Data[0]).toHaveProperty("PessoaFisicaId");
    expect(response.body.Data[0]).toHaveProperty("Nome"); 
    expect(response.body.Data[0]).toHaveProperty("Cpf");
    expect(response.body.Data[0]).toHaveProperty("DataNascimento");
    expect(response.body.Data[0]).toHaveProperty("DataInicio");
    expect(response.body.Data[0]).toHaveProperty("DataFim");
    expect(response.body.Data[0]).toHaveProperty("TipoVinculo");
  });

  it("Cadastro - Get/Cadastro/v2/pessoas_fisicas_associadas/participante - contratoParticipante nulo  e tipoAssociacaoPessoaFisicaID valido - Status code 200",async () => {
    //contratoParticipante/tipoAssociacaoPessoaFisicaID - 83238/11
    const sinqiaRequestHeader ="MTYxLDQ3LDkzLDIwNCwxNjYsNTMsMTc5LDE1LDE0NCwxMDAsOTQsMTIzLDE3NiwzMSwyOCw1NiwyNDEsMTAwLDE4OCw2MiwxNTAsMTMzLDEzMSw2NiwxNDYsNzIsMTg4LDE0NywyMDMsNTMsMzcsMTU5LDc1LDE3MSwxMjIsOTUsMCw0NiwyMjcsNzAsMTIyLDI4LDE3MCw1Niw1NSwxMDIsMTEzLDE5LDkyLDE1NywyMzUsMTY3LDU1LDEzNyw2Nyw2Miw0NiwxMjgsNjcsMTgyLDE2NSwyMzgsMjQzLDIxMSw1MCwxMDUsMjQ1LDE1MywxMzMsMTIwLDIzNCw4NCw1Nyw5NSwxOSwyNDMsMTE5LDE0MywyMTksMTkzLDIwMSwxMTEsMTg3LDE2MSw5MiwyMTUsMTUwLDIyLDMxLDU4LDM4LDIzNSwxNSwyMTEsNjIsMTY4LDQyLDE3MiwxMzksMzAsMTAzLDEwOSwxNSwyNTUsMjM0LDc5LDI1NCwyNTAsMTcxLDE3MywxNzIsMTEyLDIwMywyMDYsMTE2LDEyNSwyNTQsMjI2LDEyNCwyNDgsOTMsMjEsNDIsMjIyLDE2NywyNDUsMTQzLDEyNQ==";
    let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
    const params = {};

    // Obtém o token Bearer antes do teste
    await obterToken(entidade.nome);
    const headers = headerChamada.getHeaders();
    headers["Authorization"] = `Bearer ${global.Bearer}`;

    // Realiza a chamada GET para a API
    const response = await supertest(global.baseUrl)
      .get(rotaUrl)
      .set(headers);
      //.query(params);

    const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, response.body, params);

    if (response.status !== 200) {

      console.log(payload.toString());
      console.log(response.body);
      const now = new Date();
      const pad = (n) => n.toString().padStart(2, "0");
      const logName = `log_perfilinvestimento_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
      const logPath = path.join(__dirname, "../logsexecucao", logName);
      fs.writeFileSync(logPath, payload.toString());   
    }
   
    // Asserts para validar o resultado
    expect(response.status).toBe(200); // Espera status 200
    expect(response.body.Message).toBe("The request is invalid."); 
  });

});
