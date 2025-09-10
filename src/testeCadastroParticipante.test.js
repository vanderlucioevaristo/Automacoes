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
const rotaUrl = "/Cadastro/participante";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let params;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Participante - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - Participante - Get - Paginação maior que 50 - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Paginação maior que 50 - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com ContratoPlano criptografado
        const sinqiaRequestHeader = "";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanho_pagina: 51 };

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
        expect(campo).toHaveProperty("codigo_erro", "erro-cad-1005");
        expect(campo).toHaveProperty("campo", "TamanhoPagina");
        expect(campo).toHaveProperty("mensagem", "Tamanho da página deve estar entre 0 e 50.");
        expect(campo).toHaveProperty("valor", null);

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Paginação válida - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Paginação válida - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com ContratoPlano criptografado
        const sinqiaRequestHeader = "";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanho_pagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("Pagination");
        expect(response.body.Pagination).toHaveProperty("TotalElements",50);
        expect(response.body.Pagination).toHaveProperty("TotalPages",1);
        expect(response.body.Pagination).toHaveProperty("Page",1);
        expect(response.body.Pagination).toHaveProperty("PageSize",50);
    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com CPF criptografado - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com CPF criptografado - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF 00277416728 criptografado
        const sinqiaRequestHeader = "MjAsNDQsMTQ4LDc5LDEyMywxOTcsMTcyLDE5NywxNjIsODMsMTM4LDIyNCwxOTQsMjA2LDcsMTc1LDAsMTcyLDksMjI1LDk0LDI1LDI1MywxNjcsMjEsMzksODYsODMsMjEwLDk3LDE5OSwyMDgsNjYsNjIsMjE0LDE4OCwxMzEsMTUwLDEwNSw0MiwyMTMsODYsMjQ5LDEzNiwxNzUsNjEsNjMsMTYsMzUsMTUxLDI2LDEzNCw3NSwxNzYsNDIsMjU0LDEwMSw0NCwxMTUsMjQsNSwxNzgsMTk3LDU3LDE4NiwyNDMsMTM5LDE3MiwxMTcsMTk2LDE3MSw0NywyMjAsMTE0LDEsNDUsMzAsMTM3LDE4MCwyMDgsMjcsMjgsODksNDgsMTc1LDExNiwzOCwyMzksMTQ4LDE4NSwzLDkyLDE3NSwxNjksMTkxLDEyOSw1NiwxMzUsMTk1LDE1NSwxMTAsODUsMzAsNTEsOTMsNTQsNTAsMTg1LDE5Niw3MiwzNiwxNDAsMTYwLDkxLDk2LDI0NSwxMjYsMjE2LDEyLDQ1LDEwNiwzOSwxNDMsMTA3LDIwNSw1MSwxNjEsMTEy";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        const pessoa = response.body.Data.Pessoal;
        expect(pessoa).toHaveProperty("Cpf");
        expect(pessoa).toHaveProperty("Nome");
        expect(pessoa).toHaveProperty("NomeSocial");
        expect(pessoa).toHaveProperty("DataNascimento"); 
        expect(pessoa).toHaveProperty("Idade");
        expect(pessoa.Sexo).toHaveProperty("Id");
        expect(pessoa.Sexo).toHaveProperty("Nome");
        expect(pessoa.EstadoCivil).toHaveProperty("Id");
        expect(pessoa.EstadoCivil).toHaveProperty("Nome");
        expect(pessoa.Identidade).toHaveProperty("Numero");
        expect(pessoa.Identidade).toHaveProperty("DataExpedicao");
        expect(pessoa.Identidade).toHaveProperty("OrgaoExpedidor");
        expect(pessoa.Identidade).toHaveProperty("Uf");

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com CPF criptografado Incorreto- Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com CPF criptografado Incorreto - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF 00277416727 criptografado
        const sinqiaRequestHeader = "OTEsMTczLDE3OCw2NCwyMzMsNTAsMTEwLDc1LDE1MywyMDEsNCwyMzQsMjQ2LDEyMSw5Niw5MCwxNjMsMTUzLDIwMiw4OSwxMDEsMTcwLDE4NCw1OSw2OCwxOTQsMTM3LDEwMCwxNTEsMTIzLDIzNCwxNTUsMjExLDYwLDEzMSwxMDcsMzgsNTUsMTkxLDYsNjcsMTE3LDIzNSwxNjQsMTg1LDExMSw1LDIwMCwyNSw2LDE3NiwxMDgsMTQ4LDI1MSwxNDYsMjA3LDExOSwxNjgsMjQ2LDEwLDY4LDIyNSw3MywxNDAsMjEsMTc0LDE1OSwzNywxMzEsMjA4LDU1LDI0MSw5MSw3MSw1OSwxOTQsNzEsNDAsMjUzLDI0Nyw5Nyw1MywyMTMsNzMsMjcsNDEsMjEsMTUzLDE0NSw2OSwwLDEwMCwxNDAsMzYsMjM0LDMzLDE2NiwxODYsMTg3LDU4LDIwNiwyNDAsMTk3LDEzMiwzMiwyMTgsMTg4LDg2LDExMSwyMTcsMjM1LDk0LDIzNCwyNTEsMjE3LDExMSwxNTIsMjUxLDE4NSwzNCwxNzgsMTIxLDIyNCw4NSwyMTUsMTY3LDI0MiwxNjA=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem","Solicitação Imprópria");
        const campos = response.body.campos[0];
        expect(campos).toHaveProperty("codigo_erro","erro-cad-1002");
        expect(campos).toHaveProperty("campo","CPF");
        expect(campos).toHaveProperty("mensagem","CPF inválido");
        expect(campos).toHaveProperty("valor","00277416727");

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com CPF criptografado Inexistente - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com CPF criptografado Inexistente - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF 87656108653 criptografado
        const sinqiaRequestHeader = "NjAsMTYzLDY3LDE1OCwyNSwxMjUsOCwyMSwxNDEsMTExLDIyNywyMjIsMjMxLDg0LDg0LDE5NywxMjAsODUsMTQyLDEzLDEwOSwxNTYsMTQzLDgsMTk5LDI1MCwyNTQsMTg0LDg0LDIxNywzNCwyOCwxODIsMTk2LDExMCwzNyw5OSwxMTksMzIsMTgyLDE3NSw5OSwxNDcsMTA3LDUzLDg2LDE5MywxMDYsNzAsNDcsMjM2LDE2NSwxNzksMjMyLDksMjA0LDkzLDIzOSwxMTgsNzMsMTA4LDEwNCwxODAsNDMsNDgsMjYsMTgsNDIsMTQ0LDEyNywyNDksNTYsOTcsMTk3LDEwOCwxNjgsODQsMjE3LDIyMywxMDgsMjI3LDE4NCwxNDksNCwzMywyMzksMTAzLDMzLDIwLDUxLDE4LDIxNCw5LDE3OSwyMzcsODksNzIsNTksMTk5LDEzMSwxNDMsMjQwLDExNSw4MiwxNSwxNjMsNjQsMSwxOTcsMTE3LDE2OSw2NCw0MSwzLDEyMSwyNTEsMTkyLDg3LDE4OSwyNDAsMjM5LDE4NSw3MSwxNTYsMTU5LDE0NywxNzAsMjE4";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem","Solicitação Imprópria");
        const campos = response.body.campos[0];
        expect(campos).toHaveProperty("codigo_erro","erro-cad-1510");
        expect(campos).toHaveProperty("campo","Parâmetro");
        expect(campos).toHaveProperty("mensagem","Participante não encontrado para o parâmetro informado");
        expect(campos).toHaveProperty("valor","87656108653");

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com CPF e ContratoPlano criptografados - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com CPF e ContratoPlano criptografados - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF=00277416728 ContratoPlano=138 criptografados
        const sinqiaRequestHeader = "MjUsMjQzLDY3LDE5MCwxNDQsMjE0LDQwLDExMywyMjIsMTIzLDIyOSwzMiwxNjAsMjA4LDE2NCw5MiwyMDIsMTQ4LDg0LDIzNyw2MywyMzgsMTEsMjIwLDEyNSwxNTAsMjE4LDIyMiwxNDEsMjIyLDUyLDQyLDkzLDI0MCwxMjIsNTksMTk3LDExNiwxOTUsNDYsNjgsMTIzLDQzLDQxLDcsODYsNDcsMjQ4LDEyOSwxODcsMTMwLDQyLDgwLDExLDEyMywxODAsMjIzLDEyLDEyMSwxMTAsMzYsMSwxNjcsOTQsMjQ5LDEzLDIwMywyMywxOTAsNzIsMzAsMTc3LDEyNCwxNzMsMTI2LDIyMyw4NCwxNzYsMjgsMTM4LDIxMywxODksMjA0LDIxOSw2Nyw2Miw0NywyNDksMTY2LDM2LDE5NiwxOTksNzEsMjM4LDIzNCw5LDIwLDQ5LDIwOCw1OCwxNjEsMjM3LDg3LDk3LDE3Nyw5MCwyNDcsMTcxLDIzMywyMywxMjAsMTMyLDIyMSw3OSw1MiwxNjMsNTksMTkyLDUwLDQ4LDEzMCwyMSwyMCwyMzIsMjIyLDEwMSwxNDMsMTk=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        const pessoa = response.body.Data.Pessoal;
        expect(pessoa).toHaveProperty("Cpf");
        expect(pessoa).toHaveProperty("Nome");
        expect(pessoa).toHaveProperty("NomeSocial");
        expect(pessoa).toHaveProperty("DataNascimento"); 
        expect(pessoa).toHaveProperty("Idade");
        expect(pessoa.Sexo).toHaveProperty("Id");
        expect(pessoa.Sexo).toHaveProperty("Nome");
        expect(pessoa.EstadoCivil).toHaveProperty("Id");
        expect(pessoa.EstadoCivil).toHaveProperty("Nome");
        expect(pessoa.Identidade).toHaveProperty("Numero");
        expect(pessoa.Identidade).toHaveProperty("DataExpedicao");
        expect(pessoa.Identidade).toHaveProperty("OrgaoExpedidor");
        expect(pessoa.Identidade).toHaveProperty("Uf");

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com CPF existente e ContratoPlano inexistente  - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com CPF existente e ContratoPlano inexistente  - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF=00277416728 ContratoPlano=999 criptografados
        const sinqiaRequestHeader = "MjksMTM1LDg3LDg5LDUzLDE5MiwyNDIsMTksODMsMTM3LDE4NSwxMzAsMjksMTYxLDE4LDczLDE3MSw2NSwxMzUsMTMsMjE4LDg0LDEzMCwyNTQsMTMzLDExOCwxMTQsOTEsMjYsMTgxLDE0Miw0LDkwLDIyOCwzOSw1OSw1NiwyNDIsMjcsMjIyLDE4MywyNDksMjQ4LDg0LDY2LDE3OCwyNDYsMTEyLDE3NywyNDIsNjIsNDUsNjIsMzksMjIzLDI0MiwxNzAsMTIwLDExOCwzNCw3OCwxNzgsMTksMjAzLDIsMTA1LDIyLDExMSw0NSwxODUsMTAxLDU0LDI1MiwxNywyMzIsNTEsMTk2LDY3LDIyMywxNSwxODYsNjYsMTQ4LDI0NCwyMTYsMjM1LDEwNiw5MSwxNTIsMzIsMTU2LDYsMTUzLDkxLDE1OCwxODAsMTcxLDIyOSwxNzIsMjE2LDExMCwxNSwxNzcsOTcsMjIzLDIwNywxMjcsMjUxLDY1LDcwLDE0OSwxNDQsNDUsMjUwLDE0LDEwLDM2LDgzLDE4OCw0OCwyMzksMTMwLDE0MiwxNDYsMjMwLDMyLDI0NCwxOTc=";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1510");
        expect(response.body.campos[0]).toHaveProperty("campo", "Parâmetro");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Participante não encontrado para o parâmetro informado");   
        expect(response.body.campos[0]).toHaveProperty("valor", "00277416728/999");

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com CPF incorreto e ContratoPlano existente  - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com CPF incorreto e ContratoPlano existente  - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF=00277416727 contratoplano = 138 criptografados
        const sinqiaRequestHeader = "MTY3LDMwLDE3MCwyMDQsMjQzLDkxLDExMCw2MywxNTksMjUwLDQyLDIzMSwyNTQsMTgzLDQ1LDk0LDgyLDEyMSwxOTMsMjgsMjE3LDk5LDI0OCwxMTAsMTUxLDIzNywxMywxNDAsMjM3LDEzMiwxODcsMjI4LDIwNCwwLDIzNyw4MywyMjIsOTAsNDYsODEsMTkzLDE2MiwxMzgsNzksMTMzLDMyLDEyNywyMjUsMTYzLDEwOSwxOTgsNTMsMTE2LDQ4LDE2OCw4NiwxODMsMzIsMTcwLDMsNjIsMTAyLDIyMSwxMDQsMTk2LDkwLDEzMCwyNTUsODUsMjAzLDczLDM5LDEzOSwxODYsNzksMiwyMTMsODAsMTEsMTgsODYsNDUsMjU1LDgwLDEzNyw3OCw3NCw2OSwyMDMsMjAsMTc1LDE1NSwzMSwxNjUsMTcwLDE5LDEzMywyMzEsNzgsNjIsMTI5LDExLDE2NywxOTQsOTIsMjQ4LDE3NSwxNzMsMTU4LDIzMywxNzgsNTgsMjUsMjI2LDQxLDk0LDIwNCwxMTIsMTU2LDMyLDE3NCw2LDMyLDcyLDEyNSwxMTYsMTU0LDcw";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1002");
        expect(response.body.campos[0]).toHaveProperty("campo", "CPF");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "CPF inválido");   
        expect(response.body.campos[0]).toHaveProperty("valor", "00277416727");

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com CPF inexistente e ContratoPlano existente  - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com CPF inexistente e ContratoPlano existente  - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF=87656108653 ContratoPlano=138 criptografados
        const sinqiaRequestHeader = "MTM3LDExNSwzMiwyMjQsMTk1LDE3NCwyNDAsMTQsMjUsMjA0LDE2MiwxNDQsODMsMTk5LDU3LDIxNywxMDcsMTc0LDE0OSwzMywxMjEsMjQ2LDIyOSwyMzMsNywyNTQsMjEwLDMyLDQ4LDk4LDE3OCwyNTIsNCwyMzcsNTMsMTY4LDExMSwxMDMsNjUsMTUzLDEzMywyMzUsNzgsMTY3LDM4LDEyOCwyNDIsMTk4LDgzLDIxNCwxOTEsMTYsMTUxLDE1OSwxOTYsNDcsMjUzLDI1NCwyMDcsODUsNzgsOSw5OSwyMTUsMjMyLDY0LDIxMSw1MSwyNDUsMTgzLDEzNiwxMTUsMTE0LDI0LDE1NCw3MiwyMzcsNDEsNDEsMjEyLDIwMiwxMjEsNDIsMjA1LDY4LDE5NywxMDAsMTU5LDE3OSwxMDEsMjE4LDIwMiwyNDgsMjA3LDU4LDg3LDE3MCwxNjQsMjUyLDU4LDE2NSwyMDQsNTAsMTc3LDE2NCwxOTcsMTQyLDIxNiw0LDIwMywxMzQsMjU0LDk0LDEsMjIsMiwxNzYsNDksMjAxLDExMCwxMTcsMTAxLDIxLDIyNCw4Nyw2Myw2NCw0MA==";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1510");
        expect(response.body.campos[0]).toHaveProperty("campo", "Parâmetro");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Participante não encontrado para o parâmetro informado");   
        expect(response.body.campos[0]).toHaveProperty("valor", "87656108653/138");

    });

    it("SCAF - Previdência - Cadastro - Participante - Get - CPF nulo e ContratoPlano existente criptografado - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - CPF nulo e ContratoPlano existente criptografado - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com CPF = null ContratoPlano = 138
        const sinqiaRequestHeader = "MjYsMTkwLDgzLDkxLDI0NSw3NCwyNCw2OSwxNSw3LDI0NywxNTksMTA5LDI0NSwyNDcsMTI5LDE5OSw3NCwyNCwxMzAsMTk5LDgzLDIzNiw3MiwyLDEyOCw5MiwzNSw1OCwyMDQsMTMsNzksMjI2LDc4LDIwOCwzNSwxODQsMTUxLDEzNCwxMzcsNzksMTEyLDExNCwxNDksMTg2LDEwNywyNDksNTYsMTU4LDIyMSwxNzUsMTIsMjU0LDExMCwxMSwyOCw0NywyNDgsMTIzLDc1LDEyOSwyNDcsMjI2LDQ5LDE3NSwxMjEsMjUzLDEyNCwxNzQsNjcsNjEsMTUxLDI0MiwxOTYsMTgyLDkwLDExOSwxNSwzMSwzMCw1NSw3MywxMzMsMjI5LDEzNSwxNTEsMTM1LDEyMCwxMjksMTY2LDk3LDI0MCwyNCw1NSwxNDEsODYsODIsMTczLDExOCwxODcsOTcsMTQ1LDY1LDI0NCwxOTIsMTU3LDc2LDIwNCwxOTksMjIyLDIxMiw5NCwxMzgsNDksNSwyMTEsMjIsMTU2LDIyNiwxMTQsMTQ1LDI0OCwxNzgsNzEsMTg0LDM0LDIzLDYw";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = { pagina: 1, tamanho_pagina: 50 };

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1002");
        expect(response.body.campos[0]).toHaveProperty("campo", "CPF");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "CPF inválido");   
        expect(response.body.campos[0]).toHaveProperty("valor", "null");
    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com tempoPlano e tempoEmprego nulos no banco - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com tempoPlano e tempoEmprego nulos no banco - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com 00277416728/138
        const sinqiaRequestHeader = "MTYsMTAsMjEzLDYwLDE4MywyMjEsMTAsOTIsMTAxLDkwLDEzOSwxOTcsMTYyLDIyNCwxOTAsODAsNTgsMjE3LDEzNCwxNjMsMzgsMjI2LDk5LDI1NCwxODQsODcsMTc3LDEwMyw4MCwxNjYsODYsNjcsMjUzLDE1Myw0LDIyNCwxMDQsMzcsNDUsMTMxLDgsMTgzLDUzLDY3LDE4MCw5LDUwLDE1NCwyNDAsMzAsMjI0LDE0Miw0Miw1MCwyNTUsMjMzLDI0Niw0MywxMCwxOTEsMjQyLDExNywxNjksNDQsMTQxLDE1MiwyMTksMTE2LDc0LDEwMCwyNDgsOTYsMTE5LDI2LDYyLDE1NSwxMTgsMTQxLDI0LDE4OCwxMTUsMjA1LDIwNiw0Miw3NCw3MiwxMzUsMTMzLDE4MiwxODYsNjUsNTIsODQsMjI4LDIxMCwxMDksMjM3LDUxLDIwNSwyNTQsMTMzLDEwMSwxMTMsMjM0LDE1Miw1OSwxNjQsMTk5LDIzNiwyMjEsNzEsMTM5LDksMTg3LDIzNywxNTMsNjEsMTU1LDEzNywxMjcsMTg2LDEzMiwxMDIsNTIsMTkwLDE0MiwyOSw1";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.Data.TempoPlano).toBe(0);
        expect(response.body.Data.TempoEmprego).toBe(0);
    });

    it("SCAF - Previdência - Cadastro - Participante - Get - Com tempoPlano e tempoEmprego zerados no banco - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - Get - Com tempoPlano e tempoEmprego zerados no banco - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header X-SINQIA-Request com 19698969810/38
        const sinqiaRequestHeader = "MTQ1LDY3LDEwNiwyNDMsNzcsNTEsMTMyLDk1LDI2LDE0LDEyOCwxODksMTIxLDIxOCw0NSwxNSwxNzAsMTEzLDQ4LDE1MiwxNzEsODcsMTUsNzYsMTAwLDE4MCw3LDM0LDE3Nyw3MCwyNCw5OCwyNCw1MywxMzYsODgsMTk4LDE3OCwxNTMsMjUxLDQwLDI0OSwyNTMsMTM5LDc4LDM0LDQsMTA4LDIyMSw1Niw3NiwxMTUsMTAxLDE3NCwxOTAsMTM2LDE4LDE5NywxOTYsMTA2LDE2MywxMTEsOTEsMzcsMTY2LDEwNiwxNTMsMjAyLDY1LDgsMTgxLDE5OCwxNzgsMTc5LDcwLDYyLDI0MywxMjYsMTE5LDE4Niw0NiwyMDcsMjQ1LDc0LDEyMiwyOSw1OCwxMTAsMTE3LDE2NCw3LDI1MiwzMCwyMjMsMTY2LDIzNiwxLDEzLDE2OSwxNiwyMjEsOTAsMTg3LDE3MywyOSwxMTcsOTgsMTY0LDE3Nyw5Myw5MCwyMDUsMTcyLDE4NywxMzgsMTc5LDI0NSw2OSwyMDQsMjMzLDE2Nyw3OSw2LDEzNywyMTIsODIsMzQsMTQ1";
        let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamada.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;
        params = null;

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .get(rotaUrl)
            .set(headers)
            .query(params);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.Data.TempoPlano).toBe(0);
        expect(response.body.Data.TempoEmprego).toBe(0);
    });

	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
