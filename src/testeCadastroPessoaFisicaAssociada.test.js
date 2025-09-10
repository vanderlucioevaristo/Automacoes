// Teste automatizado usando Jest
// Arquivo deve terminar com .test.js para ser reconhecido pelo Jest

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const path = require("path");
const fs = require("fs");
const supertest = require("supertest");
const entidades = require("./globals/entidades");
const HeaderChamada = require("./globals/headerChamada");
const obterToken = require("./obterToken");
const EscreveLog = require('./globals/escreveLog');
const PayloadChamada = require("./globals/payloadChamada");

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Cadastro";
const rotaUrl = "/Cadastro/pessoas_fisicas_associadas/participante/historico";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let params;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Paginação maior que 50 - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Paginação maior que 50 - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request apenas com CPF 60031926312
        const sinqiaRequestHeader = "MjUsNTMsMTc5LDU3LDUxLDU4LDk3LDQxLDI1LDIwMyw1LDgwLDQzLDE5MiwxNiwxNjQsMzYsMTY0LDMxLDExOSwxODMsMTM5LDIwNSwxMjgsMTUwLDMxLDExOCwyMjUsMjQ3LDEyOSwxODIsMjI2LDEyOSw5NiwxNTMsMTMxLDQ0LDk2LDY2LDIxOSwxOTQsMTg5LDE2NywyMzMsMTUwLDkwLDEyNSwxOTksMTg5LDIxMSwxMTQsNjQsMTMwLDIzOSwyMDgsNjcsMTE2LDIwMywxNDcsNjcsOTUsNTMsMTI3LDEzOSwxNDEsMTY1LDEwNiwyMzAsMjQwLDIxNSwzNSwxNTksMTMxLDIwLDEzOCw0OSwxODcsOTksMjIyLDE3Niw3NCwyMzEsMjM3LDE2NiwxMDcsMjAzLDI1NCwxNjIsOCw3LDIyMCwyNTUsMjQ0LDIzMywyNTMsMTE5LDgyLDE1NywxNDcsMjQ4LDE1Niw3LDIwNywyMTQsMTYwLDE3MCwxMzgsMjE3LDEwMSwxMzUsMjAwLDExNCwxOTUsMTQ4LDQ4LDEzOCwxMDcsMjMsMTYsMzAsMzIsMTA4LDE0NiwxMjEsMjUxLDE5MCwyMzUsNTA=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 51 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1005");

    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Período de data maior que um ano - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Período de data maior que um ano - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2024-01-01/2025-12-31/null/null/null
        const sinqiaRequestHeader = "MTQ5LDI2LDM1LDI4LDc5LDExMywxODksMTcyLDIyNyw3NywyNDcsOTMsMTQsMTY4LDIzMCwxMDYsODcsOCwyMDksMTcyLDE5MSwyMDQsMTYxLDIxNCwzOCwyMzUsMjQ3LDEyMywxMzIsODAsMjI5LDIxNywyMzEsMTExLDEzMCwxNTksMjEsMTYsMTE1LDQ1LDkyLDE3LDk5LDEwMSw2MCwyMDYsNzUsMTI3LDIyMiwyMDQsMzUsMTEyLDE0MiwyNDIsOTMsMTIwLDQyLDIyMiwxOTYsMTEwLDExOCwxNjIsMjUsNzgsMjEwLDExNSw3MiwyMTcsNTEsMjIsMTE3LDg5LDIzNywyNDcsMjIwLDYsNjcsMjQ0LDEzMyw3NSw3MSw1MSwxOTEsMTIsMTg0LDIzMywxOTEsMTcxLDE1OSwzNSwyMTcsMTg0LDE2MiwxMjIsMiwxMSwxNDQsMjM1LDYwLDEyNywzMCwxMiwyMDIsMTY4LDQ5LDIzLDMwLDIxNywyMjQsMzEsMjQyLDEwMCwxNjcsMTMsMTM3LDU4LDcyLDEyNCw2OCwyMjEsMjI0LDEwNiw3MCw5Miw5MSw2MCwyMDQsNzY=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 10 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1525");

    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Consulta apenas com período de data válido - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Consulta apenas com período de data válido - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2024-01-01/2024-12-31/null/null/null
        const sinqiaRequestHeader = "OTcsMTkzLDEwOSwyMDksMzgsMTQ2LDE5OCw3NSwyMDgsMzQsNzYsMTE3LDIwNyw0NiwyNTUsMjI1LDI1NSwzOCwxNTIsMTgsMTc0LDIzOCw5OCwxNzUsMjMsMTQ5LDE2OSwxMCw5LDk1LDEwOSwxNTgsMTExLDIxOSwyNDUsMjE0LDM5LDEzMSwyMzcsMjM0LDMwLDMzLDI0NCwyNCw4NywxNjMsMTQyLDY2LDE0OSw5MCw5OSwyMDUsMTc2LDIwMiwxMzEsMjA4LDc1LDE2NywyMTMsMjM0LDExMCwxMTIsMjAzLDIyMiwzNywyMDMsMjAyLDg0LDY3LDM2LDEzNiw5MywxNzYsMTAsMTg3LDc0LDIxMCw1MywyMzksMjE2LDE5NSwxNjIsNjcsMTM0LDE4OSwzMCwyMjYsMjA1LDI0NiwyMCw3OSwxMzAsMTQzLDIwNSw3OCwyMzAsMTQxLDg5LDI1NCwyNTMsOTIsMTI5LDE3MCwyNTMsMjA3LDcxLDgxLDE1NiwxNCwxMzUsNTgsMTYzLDI0Niw1MCwxMzksMzIsMTA3LDMwLDExMCwyNiwxNzcsNzQsOTUsMTcwLDIxNyw2NCw5OSwxMzY=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 10 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0);
        expect(response.body.Data[0]).toHaveProperty("PessoaFisicaId");
        expect(response.body.Data[0]).toHaveProperty("TipoAssociacaoId");
        expect(response.body.Data[0]).toHaveProperty("Nome");
        expect(response.body.Data[0]).toHaveProperty("Cpf");
        expect(response.body.Data[0]).toHaveProperty("DataNascimento");
        expect(response.body.Data[0]).toHaveProperty("NomeGrauParentesco");
        expect(response.body.Data[0]).toHaveProperty("NomeSituacao");
        expect(response.body.Data[0]).toHaveProperty("DataSolicitacao");
        expect(response.body.Data[0]).toHaveProperty("DataCompetencia");
        expect(response.body.Data[0]).toHaveProperty("DataAtualizacao");
        expect(response.body.Data[0]).toHaveProperty("NomeSolicitante");
        expect(response.body.Data[0]).toHaveProperty("UsuarioSolicitante");
    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Consulta com período de data invertido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Consulta com período de data invertido - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2024-12-31/2024-01-01/null/null/null
        const sinqiaRequestHeader = "ODcsMTU0LDE2MSw1LDE5Niw0LDU2LDE0OCwyMjUsMzksMTAzLDE5NSw3LDc0LDIyMSwxNDYsMTkyLDEyNSw3MywxOTAsODcsMTcsMTg2LDE2NCwxMTIsMzEsMTM5LDMwLDEwNiwyNDMsMjM3LDI1NCwxMywyMDIsMjE0LDQyLDE2LDIyNSw1OSw5NCwyNTAsMTcsMTUwLDExMyw0MSw4MywyMzEsMTY5LDEyNywxMTcsMTQxLDY0LDIxNiwxMzMsMjAsMTIxLDE2MSw2MSwyNTQsMjM2LDI0NCw5Nyw4OCwyMzIsOTEsMTAzLDE3MSwxNTUsMTIsMTIyLDIsMjUyLDE4NCwxMzksMTA4LDYzLDY4LDI0Myw2MywxODUsMTU4LDE0NCw2MCwyMjEsNDcsMTQ0LDE2OSwwLDE5MCwwLDE5NywxMDcsMTQyLDg3LDMyLDc0LDc5LDExOSwxMTQsODMsMTY1LDExOCwxNTIsNjMsNTQsODIsODIsMTE3LDI1LDI0MSwxNDEsMjQ3LDE0MywxODQsMTg3LDE3MiwxNzIsMTc5LDE1LDEyMywxNTcsMjI0LDE2Nyw4OCwyNDQsMTAsMjQ0LDE1";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1043");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataInicial");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Data inicial não pode ser maior que final");

    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Consulta com parâmetros Específicos - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Consulta com parâmetros Específicos - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2024-01-01/2024-12-31/96768/2/11
        const sinqiaRequestHeader = "MzEsNjgsMjIyLDE0NiwyMzgsMTc0LDgwLDU4LDExNywyNDQsMjUzLDcwLDI3LDEyNiw1OCwxMTAsMTAzLDExNSw2NSw0MywxMDQsMTIyLDIyMCwyNDYsMTEyLDEwLDIxNiwxMjMsMjQsMjIsMjYsMjI0LDE5MiwyMzEsMjAxLDE0NiwxNDUsNTksMTM2LDEzMSw5MSwyMjUsNjcsMCwwLDI4LDIzNiwzMywwLDIxOSwyNSwxMzYsNDMsNzUsOTcsMTIwLDUxLDIxMiwyNTUsMTksMzgsMjQ1LDQ0LDEzOSwxMDAsMjM3LDIxMCwyMTUsMTY0LDY2LDE2OSwyMDksMjUxLDcyLDIxOSwyMjIsMjQ2LDExNSwxMyw2NCw1MCwxNDYsMjAyLDE3OCwxMyw2MSwxNzgsMTM0LDI1MCwxMDEsMTI1LDExOCwxMTgsNjksMTAyLDExMSw3NCw1NSwxODUsMTIwLDIsNywxMDgsMTksMjAwLDE1NSwxNzEsMTY4LDIxNyw0NiwzMywxOTksMTYsMTM2LDEzMyw2NSwxMjMsMTY3LDEyNiwxNiwyMjMsMTAwLDU0LDE1LDEzOCw1MSwyMTYsMjAy";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        const params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body
        codigoStatusChamada = response.statusCode;
        operador = "eIgual";


        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0);
        expect(response.body.Data[0]).toHaveProperty("PessoaFisicaId");
        expect(response.body.Data[0]).toHaveProperty("TipoAssociacaoId");
        expect(response.body.Data[0]).toHaveProperty("Nome");
        expect(response.body.Data[0]).toHaveProperty("Cpf");
        expect(response.body.Data[0]).toHaveProperty("DataNascimento");
        expect(response.body.Data[0]).toHaveProperty("NomeGrauParentesco");
        expect(response.body.Data[0]).toHaveProperty("NomeSituacao");
        expect(response.body.Data[0]).toHaveProperty("DataSolicitacao");
        expect(response.body.Data[0]).toHaveProperty("DataCompetencia");
        expect(response.body.Data[0]).toHaveProperty("DataAtualizacao");
        expect(response.body.Data[0]).toHaveProperty("NomeSolicitante");
        expect(response.body.Data[0]).toHaveProperty("UsuarioSolicitante");
    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Retorno vazio - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Retorno vazio - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2026-01-01/2026-12-31/96768/2/11
        const sinqiaRequestHeader = "MTA2LDEyMCwxNTUsMjExLDEyNiwxMzgsMTY3LDI0OSw0MywyMTMsMzIsMTE3LDIwNywyNTEsMjU0LDE0NCwyNDYsMTIsMjQ1LDYyLDM0LDIyOSwyMzIsMjE1LDIzMywyMDksODQsNTUsMTY3LDQ2LDg5LDExMyw1OCw2MSwxNzIsNDMsNTIsMTU1LDU3LDI0MSw2NSw0MywxODUsMjU1LDE3OSwyLDUzLDIzMywyNDMsOTgsMTE3LDE4MSwxMzQsMTI0LDYsMjE4LDEyOSwxMDAsMTcsOTksMjExLDI0MCwxMDgsNTEsNDksMTE3LDEwMCwyNDEsMTI4LDE3MCwxNzIsMTcsMTYyLDE4MiwyMDMsMTI1LDQzLDQ4LDQzLDMyLDgwLDg4LDI1LDI0MCwxMTcsMTUzLDEzOCwxMjMsMjQwLDIwOCwxNTcsMjI1LDEzMCw5MywxMjcsMjMwLDMxLDE1OSwxNDQsMjM5LDIzLDExMiw1MCw0OSw4OCwxODMsMjQzLDI0LDgwLDEwNSwyMDUsMTI5LDE0NywxODQsMTMwLDE2MCwyMzcsMTU3LDcyLDIwMCwxNzMsMCwxMzQsMjIsNTEsMTA4LDcwLDgx";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        const params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body
        codigoStatusChamada = response.statusCode;
        operador = "eIgual";


        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBe(0);
    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - IDPessoa Inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - IDPessoa Inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2026-01-01/2026-12-31/99999999/2/11
        const sinqiaRequestHeader = "MTYzLDE3MCwyNDQsNTIsNTgsMTAwLDI0OCwyNTQsODIsMjA1LDI0LDIyLDEzNCwxNDYsMTEyLDY4LDkyLDU3LDQxLDE5OCwxMDYsOTQsMjM2LDQ0LDQ5LDI0LDE3Miw0LDE5Niw0OSwyMTIsNzMsNzAsMjIzLDExOSw5MiwxNzYsMTgyLDIxMSw0OCw0MSwyNDIsMjA2LDgxLDI0NCwxOTgsODksMjU0LDcxLDI0NywxOTQsODIsMTQ1LDIwNiwyNDYsOSwzNCw1MCwzNiw1MSwxNDksMTIxLDI1NSwxNTQsOTUsMTI2LDExNSwzOCwxNjAsOTMsMTkyLDE2LDE1MiwyMzQsMTQ3LDIzMSwxODksMTI4LDEzNywyNyw4NywyNDUsNTUsOTAsMjUzLDM3LDU2LDE5MywxMTksMTM2LDIzMywxNjAsNTgsMjIzLDEwMiw1LDI1NCwyNDQsMjM5LDE1MSwyMjQsMjUwLDEyMSwxMTcsMTkzLDIxLDY3LDI1MiwxNjgsMTg0LDE3NCw0MCw0NSwxMCwxODMsMjcsMTg4LDEwOCwyNDUsMjAwLDE3NSw2NywxMTksMTkxLDE0NiwzNiwxOSw3MQ==";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        const params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body
        codigoStatusChamada = response.statusCode;
        operador = "eIgual";


        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1516");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Pessoa Física não encontrada para o parâmetro informado");

    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Situação inexistente - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Situação inexistente - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2026-01-01/2026-12-31/96768/9999/11
        const sinqiaRequestHeader = "NjgsMzUsNTksNzcsMTU2LDEzNiwzOCwxMzAsMjIxLDI4LDQ2LDM1LDQ3LDE4NywxNjMsMjI4LDI0OSwyMjQsMjAwLDQ4LDE0OCwzNCwyNDYsMjExLDMsMTEyLDMwLDE0OCwxNTIsMTA0LDE5MCwxNTIsMzgsMTEsNTEsNTIsMjIwLDg3LDk3LDE2MCwxNTMsOTAsNDMsMjQwLDEyOSw5NSwxMzMsOTEsODcsMjIyLDg0LDU0LDE1Miw0MiwyOSw4LDgxLDE1OCwyNTQsMjUyLDM5LDExOCwyMzEsNDMsOTUsMTYwLDQxLDk3LDE1NCwxMjUsNzEsMjE0LDE0NSwxNTgsMTUyLDEyNiwxMDAsMTk3LDcyLDk2LDI5LDU0LDMxLDIwOCwyMDYsNTksMTg0LDE2OSwyMDQsMTg1LDkzLDIyNCwxMjIsMjIyLDIyOCwxMzAsMTc1LDY2LDEzNCwxMTcsMTksMTkyLDE0MiwxNDYsMzgsNTUsMTgxLDcyLDExOSw4NSw5NCwxMjEsMzksMTAsODIsMTYwLDE0NCwyNSwxODMsMTIwLDE4NywxNzUsMTQ3LDY5LDE5NSwyMDcsMjA2LDE0Mw==";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        const params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body
        codigoStatusChamada = response.statusCode;
        operador = "eIgual";


        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBe(0);
    });

    it("SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Tipo associação inexistente - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - PessoaFisicaAssociada - Get - Tipo associação inexistente - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // TODO: Montar header X-SINQIA-Request 2026-01-01/2026-12-31/96768/2/9999
        const sinqiaRequestHeader = "OTcsMTUyLDc2LDY2LDE2NSw4NSwxOTksMjMxLDQ4LDE2NiwxODQsNzcsMTg3LDIxMSwxNDIsMjA0LDI0NywxNDAsMTM2LDIsMTY3LDE0Nyw4Niw1NCwxMDEsMjI5LDYwLDQ1LDE2OCw1NiwxNTQsNzUsMzUsMjUyLDE4MCwxMDgsNjIsNDksMjMzLDEwNywxMDAsMTc3LDM3LDE5MSwyOSwyNDYsMCwyMjcsMjQ5LDczLDczLDExNSwyMTAsMTgyLDE5MiwxMTksMjEwLDIwMCwzLDIzMCwxNjgsMywxMywxOTQsMjQ5LDYsMjM4LDIzMiwxNiwyMTgsMTIyLDUzLDE0MiwxMzAsMjA2LDU4LDgxLDI1NSwzNywxMTksMjA1LDE0NSwxNzgsMTkzLDE5MSw0OSwxMzQsMTg5LDIwOCwyNDcsMjIyLDcyLDM4LDE0NSw0MywxNzIsNjIsMTI4LDEzNiwyOSwxNjQsMjA2LDIwOCw1OSwxNDgsMTU3LDIzLDE0NSw3OSwxNjAsMzQsMjIyLDg4LDIxMyw4MCwzOSwyMzEsNTcsMTA3LDU5LDMzLDMxLDE1NSwyMDUsMjksMjE3LDIxNCwxMTE=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        const params = { pagina: 1, tamanhoPagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body
        codigoStatusChamada = response.statusCode;
        operador = "eIgual";


        //Chamada para o ambiente de virtualização

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1531");
        expect(response.body.campos[0]).toHaveProperty("campo", "TipoAssociacaoPessoaFisica");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "TipoAssociacaoPessoaFisica não encontrado para o parâmetro informado");

    });

	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
