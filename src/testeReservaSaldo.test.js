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

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Reserva";
const rotaUrl = "/Reserva/saldo";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let params;

jest.setTimeout(60000);

describe("SCAF - Previdência - Reserva - Saldo - Suite de Teste API", () => {

    it("SCAF - Previdência - Reserva - Saldo - Get - Paginação maior que 50 - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Paginação maior que 50 - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-08-01/2010-09-01/20829811/192
        const sinqiaRequestHeader = "NTMsMjQ5LDEwMCw1OCwxNTcsMTU4LDE3LDQsMjEyLDE1MSw2NiwyMTYsMTcsOTcsOTIsMTIwLDg1LDc4LDIyNCw2NCwxMjgsMTM5LDY3LDEsMTA3LDE1OCwxNDQsMjIxLDE3NiwzNCwxLDEwOSwxMiw5MCw2MiwyNDUsMTA0LDE3NSwyOCwxOTAsMTkwLDgzLDY3LDc5LDEyNCw1NiwxNDAsNzUsNDYsMTI4LDg3LDYxLDE0NiwxNzQsMTA2LDIwOCwxNDksNCwxMzUsODMsNzMsMTk3LDMsMjM0LDEwOCw2NCwxNjcsMjUwLDksMzgsNjcsNSw3MSwxMSwyNTIsMCw1Nyw1LDk0LDE5OSwxMjksMTE3LDEzMCwxOSwxMzEsMTMsMTM0LDIwOSw2NSwxNzQsMTQ4LDU1LDExNSw1NSwyNDgsMjE3LDIwMyw2NSwxMywyNTQsMTUyLDM4LDIyNywyMDUsMTM3LDEzMywxOTUsOTgsNjQsNzgsMjIwLDE2MSwxODQsMTc1LDExMywxMDIsMzMsMzksMzEsMTc0LDIxOSwxMDksMTIwLDE5Nyw2NywxODMsNTYsMTEx";
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

        //Assert
        expect(response.statusCode).toBe(400);
        expect(typeof response.body.codigo_erro).toBe("string");
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        const campo = response.body.campos[0];
        expect(campo).toHaveProperty("codigo_erro", "erro-res-1005");
        expect(campo).toHaveProperty("campo", "TamanhoPagina");
        expect(campo).toHaveProperty("mensagem", "Tamanho da página deve estar entre 0 e 50.");
        expect(campo).toHaveProperty("valor", null);
    });

    it("SCAF - Previdência - Reserva - Saldo - Get - Paginação com página zero - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Paginação com página zero - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-08-01/2010-09-01/20829811/192
        const sinqiaRequestHeader = "NTMsMjQ5LDEwMCw1OCwxNTcsMTU4LDE3LDQsMjEyLDE1MSw2NiwyMTYsMTcsOTcsOTIsMTIwLDg1LDc4LDIyNCw2NCwxMjgsMTM5LDY3LDEsMTA3LDE1OCwxNDQsMjIxLDE3NiwzNCwxLDEwOSwxMiw5MCw2MiwyNDUsMTA0LDE3NSwyOCwxOTAsMTkwLDgzLDY3LDc5LDEyNCw1NiwxNDAsNzUsNDYsMTI4LDg3LDYxLDE0NiwxNzQsMTA2LDIwOCwxNDksNCwxMzUsODMsNzMsMTk3LDMsMjM0LDEwOCw2NCwxNjcsMjUwLDksMzgsNjcsNSw3MSwxMSwyNTIsMCw1Nyw1LDk0LDE5OSwxMjksMTE3LDEzMCwxOSwxMzEsMTMsMTM0LDIwOSw2NSwxNzQsMTQ4LDU1LDExNSw1NSwyNDgsMjE3LDIwMyw2NSwxMywyNTQsMTUyLDM4LDIyNywyMDUsMTM3LDEzMywxOTUsOTgsNjQsNzgsMjIwLDE2MSwxODQsMTc1LDExMywxMDIsMzMsMzksMzEsMTc0LDIxOSwxMDksMTIwLDE5Nyw2NywxODMsNTYsMTEx";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 0 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(typeof response.body.codigo_erro).toBe("string");
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        const campo = response.body.campos[0];
        expect(campo).toHaveProperty("codigo_erro", "erro-res-1005");
        expect(campo).toHaveProperty("campo", "TamanhoPagina");
        expect(campo).toHaveProperty("mensagem", "Tamanho da página deve estar entre 0 e 50.");
        expect(campo).toHaveProperty("valor", null);
    });

    it("SCAF - Previdência - Reserva - Saldo - Get - TamanhoPagina zero - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - TamanhoPagina zero - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-08-01/2010-09-01/20829811/192
        const sinqiaRequestHeader = "NTMsMjQ5LDEwMCw1OCwxNTcsMTU4LDE3LDQsMjEyLDE1MSw2NiwyMTYsMTcsOTcsOTIsMTIwLDg1LDc4LDIyNCw2NCwxMjgsMTM5LDY3LDEsMTA3LDE1OCwxNDQsMjIxLDE3NiwzNCwxLDEwOSwxMiw5MCw2MiwyNDUsMTA0LDE3NSwyOCwxOTAsMTkwLDgzLDY3LDc5LDEyNCw1NiwxNDAsNzUsNDYsMTI4LDg3LDYxLDE0NiwxNzQsMTA2LDIwOCwxNDksNCwxMzUsODMsNzMsMTk3LDMsMjM0LDEwOCw2NCwxNjcsMjUwLDksMzgsNjcsNSw3MSwxMSwyNTIsMCw1Nyw1LDk0LDE5OSwxMjksMTE3LDEzMCwxOSwxMzEsMTMsMTM0LDIwOSw2NSwxNzQsMTQ4LDU1LDExNSw1NSwyNDgsMjE3LDIwMyw2NSwxMywyNTQsMTUyLDM4LDIyNywyMDUsMTM3LDEzMywxOTUsOTgsNjQsNzgsMjIwLDE2MSwxODQsMTc1LDExMywxMDIsMzMsMzksMzEsMTc0LDIxOSwxMDksMTIwLDE5Nyw2NywxODMsNTYsMTEx";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 0 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(Array.isArray(response.body.campos)).toBe(true);
        expect(response.body.campos.length).toBeGreaterThan(0);
        const campo = response.body.campos[0];
        expect(campo).toHaveProperty("codigo_erro");
        expect(campo).toHaveProperty("campo", "TamanhoPagina");
    });

    it("SCAF - Previdência - Reserva - Saldo - Get - Com todos os parâmtros corretos - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Com todos os parâmetros corretos - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-08-01/2010-09-01/20829811/192
        const sinqiaRequestHeader = "MTU1LDE2LDIzMSwxMjYsMTE3LDE3NCw4MCwxMzgsMTYxLDE2LDIwNywxNTQsNjAsMTY2LDE2NCw1MCwxODEsOTcsMjQwLDI1NSw3MywxMzEsMTA1LDI1MywyMzMsOSwxMzEsMTU5LDE5MSwyMTIsMTg4LDQ3LDY5LDk3LDEzMywyNSwxMSwyNDgsNjcsMjE2LDMwLDIxNiw4MSwxNzgsMjUyLDE0OCwxNTksMzIsMjM2LDIyOSw3MiwyMzksMzQsMjIxLDE4MCwxMiw4MSwxMDQsNTIsMTI5LDIyMiw1MywxODAsMjUzLDE5LDU4LDk3LDE5OCwxMTksMTM0LDE3OCwxMzMsMTQsMTMxLDIzMywyNCw5Nyw5MSw0MSwxMjgsOTUsNTMsNTYsMTkyLDIyNSwxOTUsMTE0LDE5MywzLDY4LDIwNiwxMTYsMjQ4LDE2LDEzMiwyMDcsMjQ0LDEwNCwxOTIsMjAwLDE2NiwxLDI1NCwxMjksOTMsMjA1LDEwMywxNzYsNTEsMTk0LDM0LDU0LDk2LDEyMiwxNTEsMjUwLDE1NiwyNDksMTA3LDU2LDQyLDI0NiwzMiwxNDQsOTksNzgsNzgsMTQx";
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

        //Assert
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.Data)).toBe(true);
        expect(response.body.Data.length).toBeGreaterThan(0); 
        expect(response.body).toHaveProperty("Pagination");
        expect(response.body.Data[0]).toHaveProperty("Plano");
        expect(response.body.Data[0]).toHaveProperty("NomePlano");
        expect(response.body.Data[0]).toHaveProperty("Perfil");
        expect(response.body.Data[0]).toHaveProperty("NomePerfil");
        expect(response.body.Data[0]).toHaveProperty("CtaSeguridade");
        expect(response.body.Data[0]).toHaveProperty("NomeCta");
        expect(response.body.Data[0]).toHaveProperty("ValorMoeda");
        expect(response.body.Data[0]).toHaveProperty("QuantidadeCota");
        expect(response.body.Data[0]).toHaveProperty("QuantidadeIndice");
        expect(response.body.Data[0]).toHaveProperty("DescricaoTipoOrigem");
    });

    it("SCAF - Previdência - Reserva - Saldo - Get - Com as datas invertidas - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Com as datas invertidas - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-09-01/2010-08-01/20829811/192
        const sinqiaRequestHeader = "MjIsMTE4LDE3MSwyMzYsMjAyLDcxLDE0MCw3MCwxMjgsMTE5LDE0MiwyMDcsNDAsMTY0LDEyNCwyMjksMTQxLDIwNywyMTgsMjE5LDE2MywxMiwyNDUsMTk3LDIzMiw1OSwxMjIsNDMsMTQ1LDEyNCw4MCwxNjAsMTcsNDMsMjMsMTM4LDEyNSwxMzMsNzcsMTEwLDIyNSw5Niw0LDE3Myw5NSwyNDIsMiwyOSwyMDMsMjUsODAsMTI5LDQ4LDI0LDIxMCwxMDAsMTE0LDIzMSwyMTgsMTc2LDExNiw3MywxOTUsOTgsMTQ0LDIxNywxOTAsNTYsMjQ2LDk3LDE2Miw3OSwxMCwyMTAsMTYxLDE3MSwxMTIsMjQsMjcsMTgyLDQsNiwyMTIsMTMwLDIwNywyMTUsMTM0LDE1Myw2NiwxMzksMTM1LDExNSw0Niw5MywxODgsMjQzLDI0NywxNjcsMTk2LDEzMiw1OSwyMTQsMjE0LDIyMiwyNDksMTAyLDE1MCw3NSw5NywxNjksNDEsMjQ1LDY2LDM2LDI0MiwxODQsMjA0LDI0MiwyMDIsMzAsMTYsODIsNDgsMTMyLDIwMywxOTIsMTg4LDE1MQ==";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 999, tamanhoPagina: 10 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem","Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-res-1016");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataInicial");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "A Data inicial não pode ser maior que a data final");
        expect(response.body.campos[0]).toHaveProperty("valor", null);

    });

    it("SCAF - Previdência - Reserva - Saldo - Get - Com participanteSA inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Com participanteSA inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-09-01/2010-08-01/99999999999/192
        const sinqiaRequestHeader = "NTYsMyw2NywyOCwxMDgsMTAsMTIsODQsMTIzLDQ2LDU0LDI1MSwyMTUsMjE4LDIxMywxNTgsMjIxLDExMSw4OSwxNzcsMTY4LDE3OCw2OSwxOSw0NSwyMDksMTU4LDYwLDI0MCw0MywxNywxMjcsMTIsMTIwLDExOCw0MCwyMTAsNDAsMTM2LDEwNiwyMDIsNTQsMjI0LDc2LDE1MywxLDE1Niw2MSw0LDkxLDIxOCwyNTQsMTQsMjQxLDE5NywxODgsOTUsMTQ2LDE2Miw0NSwxOTIsNzgsMjI0LDk4LDExMCwxMjIsMzcsOTYsMjE1LDE0OSw0MSw3MiwyMjMsMjE3LDEwOCw1OCwxMzQsMTc0LDg5LDUwLDE5MywxMyw4MCwxNzAsMzUsMjM4LDkyLDEsNjYsNTIsNjUsOCw4NCwyMzMsNDUsMTMzLDEzOSwyNTQsNDgsNDMsMTgzLDEwLDM4LDM1LDgyLDIzNiw1Nyw2MCw2NCwxMDMsOTgsMjE2LDY5LDM4LDI1NCwxNTksMTUyLDIwOSwxMCwxMzUsODEsODgsNDQsMjA1LDI1NSwxMDEsNDUsNTI=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanhoPagina: 1 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-res-1017");
        expect(response.body.campos[0]).toHaveProperty("campo", "Parâmetro");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Participante ativo não encontrado para o parâmetro informado");
        expect(response.body.campos[0]).toHaveProperty("valor", "Participante SA: 999999999, Contrato Plano: 192");
    });

    it("SCAF - Previdência - Reserva - Saldo - Get - Com contrato plano inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Com contrato plano inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-08-01/2010-09-01/20829811/999999
        const sinqiaRequestHeader = "MTQyLDE2NywxNywxNywxOCwxMzIsMjMxLDI1LDk1LDIyOCwxNjksMjQ1LDEwMSwxOCwxOTksNjMsMjM4LDE4NywxNTQsMTcyLDIwMSwxNTIsMjQ5LDI1MCw5MCwyMDksMjQzLDE3MCw3NywyMDAsNCwzNywxMjcsMjE5LDE5MywxNTEsMTEyLDE5MiwxNTYsMTMsMTkyLDIxMywyMCw2Niw0OSwxNjUsMjI4LDIwNCw5OCwxNTIsMjA1LDEyLDEzNywxMzIsMzUsMTksNTksMTg5LDExMiw2MywyMTksMjI5LDI1NSwyMTgsNTUsMTQ4LDIxNywxODUsMTAzLDYxLDE5MCwyMSwyNDQsMTE1LDQ2LDk5LDIxNywyMTUsMjUwLDgwLDcwLDE5OCwyMDksMjEsMTE3LDcsNDksNjcsMzgsMTMyLDEzMCw5NSw2MSwxMzAsMTY0LDMsMTE3LDE5NiwxNjEsMjcsMjE2LDI0MSw5OSwyNCwxMzMsMTE3LDEwMiw4MiwxMTMsMTkyLDE4NywxMiwyMDMsMjU0LDI0Nyw2NywwLDY0LDE3MiwyNTUsMTg1LDkzLDE0MiwxNDUsMSwxOCwyMTksNzY=";
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

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-res-1017");
        expect(response.body.campos[0]).toHaveProperty("campo", "Parâmetro");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Participante ativo não encontrado para o parâmetro informado");
        expect(response.body.campos[0]).toHaveProperty("valor", "Participante SA: 20829811, Contrato Plano: 999999");
    });

    it("SCAF - Previdência - Reserva - Saldo - Get - Sem token de autorização - Status code 401", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Sem token de autorização - Status code 401";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        // Header X-SINQIA-Request
        const sinqiaRequestHeader = "";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        // Não adiciona o token de Authorization
        params = { pagina: 1, tamanhoPagina: 10 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(401);
    });

    it("SCAF - Previdência - Reserva - Saldo - Get - Com participante inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Reserva - Saldo - Get - Com participante inválido - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);

        // Header X-SINQIA-Request 2010-08-01/2010-09-01/0/0
        const sinqiaRequestHeader = "MjAsMjUzLDYwLDg4LDE4Niw4Nyw4LDEzNCwxNzMsMjExLDExNCwxNyw1NywxODcsMjQxLDQ1LDE3OSw2MSwyMDQsNzIsMTYzLDM1LDE5Myw3NCwyMTUsMiw5NywyMCwyOCwyNTQsMTIwLDc3LDI0NCwxNjcsOTcsMTI1LDE1MiwyMCwxNDksMjE5LDEyMCwxNjgsNiwxNDksNTAsMTQ3LDM1LDMxLDc2LDExMCwxNjIsNjgsMTI1LDE1Nyw1NSwxNDAsMTc2LDE0NSw1OCw1MSw2LDE0NywyMzYsMTE4LDEwMSwzMywxOTEsMTY1LDIwMywxMDQsMjEzLDEyNywxOSwxNzgsMTI1LDE0MCwxNTIsMTc4LDg4LDc1LDI0OCwyMzMsMTk4LDI3LDEzNywxNDUsMTk3LDcwLDE2MiwyNSwxNzUsMTI5LDI0Niw1Miw2MCwyOCwyMjgsNTksMTk3LDQzLDI1LDEzNyw3MSwyNDQsMTA2LDI5LDczLDIyNSwyMzAsMTA5LDI1LDIwMCw4NywxNjcsMjA3LDE4Niw2Nyw5LDk3LDQzLDE3MSwyMzEsMTQ3LDQ5LDI0OSwzNywyNTQsNjk=";
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

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-res-1014");
        expect(response.body.campos[0]).toHaveProperty("campo", "ParticipanteSA");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Informe um ID de participante válido.");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
    });


    afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
