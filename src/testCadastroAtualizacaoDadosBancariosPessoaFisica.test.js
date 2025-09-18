//Solicita a alteração dos dados bancários de uma pessoa física e retorna informações sobre o processo de alteração iniciado

// Teste automatizado usando Jest
// Arquivo deve terminar com .test.js para ser reconhecido pelo Jest

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const path = require("path");
const fs = require("fs");
const supertest = require("supertest");
const entidades = require("./globals/entidades");
const HeaderChamadaPost = require("./globals/headerChamadaPost");
const obterToken = require("./obterToken");
const EscreveLog = require('./globals/escreveLog');
const PayloadChamada = require("./globals/payloadChamada");

// Seleciona a entidade para o teste
const entidade = entidades.find((e) => e.nome === "VISAOPREV");
const rotaHeader = "Cadastro";
const rotaUrl = "/Cadastro/pessoas_fisicas/dados_bancarios";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Dados Bancários - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 39 ContratoPlano = 254  {    "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4",    "TipoPessoa": 1,    "FormaPagamento": 1    }
        const sinqiaRequestHeader = 'MTY1LDIxNSw3MywxNjYsMjM2LDE1NSwyNywxNTcsMTExLDU5LDE5MSwxNDUsMTQzLDEzNiw0NiwyMzYsMjU1LDE2Nyw3NiwxNTQsMjA2LDAsNDYsODgsMTI1LDEwMCwxODAsMjQwLDYzLDM3LDIyNiwxODEsMTYyLDI0OSwxMzQsODQsMjAsMjUsMjIsNTUsMjIsMjEsMTUyLDIyNCw0MywxNTksNTYsMTkxLDEwNyw2NCwyNTMsODYsMTA0LDEwNywxMTYsMTcxLDE4MSwxODIsOTcsMjQ4LDE1Myw1OCwyNyw2NiwyMDgsMTAyLDIxNiwyMzcsMjA4LDEzNCwyMzEsMTIwLDE4MCwyMTMsMjU1LDUxLDEwOCw2MCwxNTYsNzgsMTM4LDI0OSwxMjAsMjQ5LDg3LDE0LDI1NCwyMDYsNTYsMTAxLDE0NiwxNTksMTcxLDIxOSw0Myw1MCwyMzMsMTg4LDE3MCwxOTAsMTU3LDEwLDE3OCwxNzYsMjAwLDIxOSwxMTcsMjA5LDE3MywxMDQsMzIsMTMxLDE3OCwxNDQsNzAsNSwyMzksMTI3LDE2NiwxMDIsMjI5LDI0NSw5NSw1LDY4LDc4LDEwMCwxMTg=';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTQ2LDIxLDcyLDMsMTUyLDIzNyw4LDE5MywxNTUsNTYsMjQ0LDI0NCw2MywxNTMsNjEsMzgsODYsOTIsMjcsMjcsMjIzLDQ3LDE4Nyw3NCw1LDIwNSwxNTcsMTcsODksMTEwLDExOCwyMzcsMTc1LDExNiwxOTAsMjA3LDE5MywyMDMsMjU1LDEyNiwxODEsMzcsMTc5LDEyMywxMyw0MywzNywyMjEsODQsMTA4LDEyOSw4Myw2MywxMSw5MCwxMjYsODEsMTg3LDEwLDEzLDEwNywzNyw0LDIwMSwyNDksMjA0LDUwLDU0LDIzLDAsMjEzLDM5LDIyOSwxNzAsMTI2LDIyMSwxMTcsMTczLDIwMCwyMjksMjAxLDIzNiwxMDcsMTU5LDE0MiwxNDMsMjA1LDk4LDE4MCwyMDMsMjQxLDE0MCwxMjUsMTM1LDE1LDM2LDE4MywxMzMsNjksMTU0LDE3MCwyMTAsMjEwLDE3Nyw5OCwwLDIzMCwxNzMsNTYsMTc2LDE4NSwxNzgsNTMsNTQsOTgsMzUsNjAsNjIsMTA3LDEyNSwyMzksMTA4LDcyLDc0LDE2MiwxNjAsMTEsMTIwsQia4hlRgmam+9lyv7I9porLUAUsDuz26wJI8FjzC1k74rYPzS+JTf593M2l8iS2zTRsJ5hSX9CmvRMKosVfZ+CZoXXUZW3fx4Ht84+vKzypMJGYIU02xOlNTIutU6zrsVRkGU8jbEv3ESv/SRL9c3ESsjHfeL8dAOSYopbnY+ktJamwx6UzyBdDNuVpa6MuwYsg3AqiYrf0V8KflMT5KCH9LpQ==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("Processo");
        expect(response.body).toHaveProperty("ProcessoDescricao");
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
        expect(response.body).toHaveProperty("Justificativa", null);
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Beneficiário - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Beneficiario - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 597 ContratoPlano = 254  {   "TipoPessoa": 2,    "FormaPagamento": 1     "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"}
        //CLAUDIA DA SILVEIRA
        const sinqiaRequestHeader = 'MzgsNzgsMTE0LDE5NCwzOCwxOTQsNjQsMTcyLDM0LDE0MiwyMDQsMjA1LDE1NywxMTcsMTIsOTIsNDcsMjI5LDE1MCwyMywzNywzMiwxMDQsMTAzLDIzOSw0Miw0MCwxNzEsMTgwLDIwNCw5NSwyMzksOTIsMTk4LDY0LDM3LDQ2LDI0OCwxNjEsNjksMjAzLDI1MSwxMjYsMTQzLDEsOTgsMjUyLDEwMiwzMywyNTEsNTcsMTY0LDE0NCw5MSwxMTAsMTc5LDIxOCw4NSwxNDgsNzUsMTczLDEyOSwzNCwxNjksMTQsMTkyLDQ5LDIyOSwxODMsMjI0LDM2LDMwLDIyOCwxOTksMTM2LDI0NywxLDkzLDMxLDYwLDE4MiwxODEsNDksMTUsMjQwLDQyLDE3MSw0NiwxOTUsMzksMTksMTk2LDIyNSwxMjMsNDksMjQyLDE3MCw4OCw5MSwxODIsMzUsMTI2LDEzNiwyNCw5MSwyNTIsMjUyLDM5LDg1LDEyNywyMTIsNzcsNjksMTY0LDE4Miw2OCwxMjcsMjEyLDExNiwyMzYsNjcsMTU1LDIwNSwxNDIsNDIsOTEsMTQwLDEwNg==';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //JOSE TARCISO MORI
        corpo = "MzEsOTIsMTQxLDExMyw0LDE4MywxNDAsMjQ0LDE4Niw3OSwzMCwxNzksMjM5LDkwLDEzOCwxNzcsNTgsMTk0LDE0MCw4MywxMTAsMTM0LDE2NywxMywxOTYsMTQ3LDE3Miw2NiwxNzgsMTg2LDIzNiw1NywxODQsMTYyLDkwLDE0MSwyNTQsMjQ3LDI1MiwxNjUsMTUwLDYzLDIyMSw2MywzMSwzMywyMTEsMTUwLDUzLDg5LDEwNiwxMTcsNjQsMTg2LDE1NywxOTAsMTg1LDc1LDExNCw3OSwxOTksMzEsNDUsMTUyLDU5LDIsMTMsMTMsMjQ5LDczLDE1NywxMzksNzksMjQxLDEzNiwzNywxNjIsNDgsMTYyLDEwNiwyMjcsODIsMTE1LDEwMiw4OCw3OSwxMDksMTQsNzEsNTQsMTIwLDE5MCw0MCwxMTEsMTc5LDIzOSwxMTQsMjM0LDIyOCwxMTUsMTA5LDgyLDY1LDEzNywxNTUsMTc4LDE5NSw3LDE2MiwxMjgsMTgyLDE3NiwxNjcsMTAyLDEzOSwxNzksNjgsNTMsMjUxLDIyNiwxOTgsOTksNTgsMTc4LDgsMjE0LDIwMyw0Ng==sQia4hlRgmam+9lyv7I9porLUATyx1tfGYpI5fFcBvU+W6rV2y0fpPPWbs8B1nY3vQWoz4sdWXJplJCydca/L+MAEOvRso3/WEKhuvD6GlPFav0gzKK9c+FR1XKsXSqPNyUNDBygMJ1i8TS46BJoybURpP+OSgHmcb4iyQq2S3DwGb/8rY7Fiq5qza4tojsBfBhz5ISrmWQPZBor1ayeMeqZFnQ==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("Processo");
        expect(response.body).toHaveProperty("ProcessoDescricao");
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
        expect(response.body).toHaveProperty("Justificativa", null);
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Beneficiário Associado - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Beneficiario Associado - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 63761 ContratoPlano = 254  {   "TipoPessoa": 3,    "FormaPagamento": 1     "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"}
        //ADRIANA CARVALHO DA SILVA
        const sinqiaRequestHeader = 'MTI2LDI1MCw4Miw0MCw5OCw0MCwxNzksMzMsMjEzLDExOSwyNDYsMjM5LDY3LDYxLDI1NSwxNDUsNzcsNTUsNDMsMjIxLDE3OCw5MywxMjAsNTEsMCwxNjQsMTYxLDg5LDYyLDMwLDU2LDY0LDEwNCw3MSwxNDMsMjAsMjIyLDI0NCwxMDQsMTQ2LDM3LDc1LDI0MCwxNDEsMjAsMTQ4LDIwNiwzNywxMTcsNTAsOTEsMTYzLDEzMSwxMjAsNDEsNDUsMTYzLDksMzMsMjI3LDYyLDMxLDk2LDk3LDEwNSw4MywxNjUsMTE1LDUsMTAyLDEyMCw4LDg3LDE4MCwxNDMsODcsMTQzLDEyLDE0MSwyNDgsMTA5LDk0LDE4NywxMTcsMjAwLDE0NywyNDIsMjA1LDE1MCwyMzksMTc2LDIzLDE1OCw2MCwyMzUsMjAyLDE4OCw3MCwxMjgsMTk4LDEzMCwxMDAsODUsMjQwLDIxLDIzMCwxNjQsMjM5LDUyLDQ4LDExOCwxNzcsMjU0LDE2NSwxLDAsMTAxLDEzNiw0OSw1NSwxMTMsMTAzLDE2MCwyNDIsMjcsMTM2LDQzLDgz';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //SORAIA ADRIANA SILVA DE ALMEIDA
        corpo = "OTcsMTY1LDY0LDE3NywxMjksODksMTM2LDY0LDMwLDc5LDIxNyw4OCwxLDE0NiwxNzgsMjE5LDIzMSwxMjUsMzYsMTcyLDI0NCwxOTMsMTE3LDMzLDI1NCwxMzcsNzcsMjI1LDI1NCw5NywyMCw1MywyMjQsMTAwLDc4LDI0Myw5MCw0OCw4MSw1Miw0OCw3LDIxMiwxNzEsMTAyLDE5MCw5MSwxNzAsNDgsMTQyLDIyLDk1LDM0LDIzLDExOSwxODMsMTc2LDEwMCwxNCwxMzEsNDYsMTAsMTc2LDE0MSw3NSw0MywxOTYsOTcsMTQzLDEzNiw0NSw0MSwyNDksMzcsMTE4LDE2OCwxOTIsMjM2LDIyNCwxMjgsMTkzLDIyOCwxNjcsMTgxLDIwNCwxNjMsMjE0LDg0LDE5NywyMjMsNywyNDQsODQsMjExLDEzLDEzNiwxNjQsNTIsMjI3LDM0LDUxLDExMyw3Miw1MywxMjcsODIsNjAsMzQsMjEyLDE4Nyw5OCwxNTcsNTAsMTgyLDQzLDE0Miw2NCwyMTYsMTk5LDIxMCwxMDYsMTQ3LDk1LDE2MywwLDg0LDczLDExsQia4hlRgmam+9lyv7I9porLUASrGZ7c+6j2IzBUwh3fXY8ytqziIcWOIj8P8S6QlnuPs6PObTSrPr+XGx7mIKsc1//TsBxNhZn7PZYu1fFK/gcxa3Aqo0SwebKyW35vHt7CE7Jd1iHyHmcXY3LZ2nnJ4rOv+77FXBDo5IdzOrhwpaxLkO2BtJgonMjEmr3mD4Kr1cJzh/TXMv73KiNbcanZ0kw==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("Processo");
        expect(response.body).toHaveProperty("ProcessoDescricao");
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
        expect(response.body).toHaveProperty("Justificativa", null);
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Pessoa Física Associada - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Pessoa Física Associada - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 101802 ContratoPlano = 192  {   "TipoPessoa": 4,    "FormaPagamento": 1,     "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"}
        //GABRIELA CALVO GARCIA
        const sinqiaRequestHeader = 'MzMsNzMsMjE0LDE4NywyNTAsNzYsMjQ0LDE1NCwxMSwxMjUsNjcsMjQ0LDExNyw1NiwxMjQsNTYsMTg4LDcsMzAsMjM4LDk5LDE0MCwxNzgsMTgyLDI0MywxOSwyMjMsMTM1LDY1LDI0OCw0NiwxNzMsMTYyLDIzNSwxNzQsMTEyLDIxLDE1MSw2MywxMjQsMTEyLDIzLDg1LDIzOCw5MiwyNCwyNTEsMTMsNTUsMjEwLDE0OCw1NSw3NCwxNjUsMTE0LDIzOCwyMzUsOTIsMjE2LDYwLDIzNiwxMDUsMTc1LDc3LDc3LDc3LDIyMCw2MSwyMTksMjQ3LDE3MCwyNDEsMTA3LDE2NSwxNSwxMDMsMTcxLDY1LDE0OCw2Myw5NywyMzYsMTc4LDM5LDI3LDI0Nyw1MSw2MCwyMTQsNTYsMTAxLDIxOSwyOCwxNjcsMjA1LDE5NywyNDAsNTMsMTUsMjksOSwxMTMsMTA1LDU2LDIwMywyNyw3NCwyMzQsMTgwLDgxLDE5MSwxNzYsMTI0LDE1MywxOTAsMjE3LDE2LDk3LDIzNCwxNjQsNzgsMTkwLDIxMCwxODYsMTU4LDE0MCwyMjEsMjIw';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTI2LDcwLDk2LDEwMiwxMDIsMCwxODksMTg5LDE2MCw0NywxOSwyNTAsMjEsMjU0LDIwMCw1Miw0LDgwLDIyNywyMjAsMTk1LDEwOSwxNjAsMTA5LDEwOSwxOCwyNywxOTAsMjUyLDQyLDI2LDYsMTA1LDI0MCw4NiwyNiwyNDEsNjIsNDUsMTQxLDc4LDUyLDEwMSwxNzIsMTEwLDIwMCwxMzQsMTYsMTkxLDI2LDExMywyMDUsMjA3LDIxMiw0NCwxNzksNiw2MiwxMDcsMTI1LDEyNCwxMDcsMTQyLDI2LDIxMCw5NSwxNjQsMTYsOTgsMjAzLDE3OCwyMDEsMTY3LDEwNywxNDYsMTkyLDE3Nyw2MCwxNDksMTAwLDg0LDIxNiwxNywxNjAsOTIsODAsMjQzLDIyNiw2OSwxODAsMTQ2LDExMiw0MSwxODIsMTQ0LDE3MywxMTgsMjA4LDIyMiwxOTksMTY2LDE2NCwyMTksMTcwLDQxLDIwOSwxNDAsMTUyLDE2NiwyNDcsOTEsMTM5LDE4LDIwMSwyMTAsMjIyLDE4NCwxNTUsMjM1LDY1LDc0LDEwMSwxMjYsMTk3LDMxLDMwLDE1Myw2Nw==sQia4hlRgmam+9lyv7I9porLUAcy5F/R9QNpcFxLss0UNMfR5ekt78FXAIljMdrfhG4kXJDDXl12rSm3M+iTC3Lv2D/36fN4VMTNhWHn4L8lF52CGq9XuxdwlM7L3GdhNUE+b/arWmjJ4GVrwgOzjwwKV78APdW6j1v4jA3S/WCTLrhckljyz40IId0mJEXvF0s5+1prI4TTe2IwaJ3MVp7E+UMMja5j/exiWzNi0o8QiNfQ=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("Processo");
        expect(response.body).toHaveProperty("ProcessoDescricao");
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
        expect(response.body).toHaveProperty("Justificativa", null);
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Sem tipo pessoa - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Sem tipo pessoa - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 101802 ContratoPlano = 192  {  "FormaPagamento": 1     "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"}
        //MARCIA CORTEZ BRANDANI GIULIANO
        const sinqiaRequestHeader = 'MTMxLDExMCwyMzUsMjM4LDI1NSwxMDgsMjIxLDE5LDE1NiwxMzAsMTU0LDgyLDE5Niw5MiwxOTIsMTMzLDE3MSwxMSwyOSw3NCwyNDQsMTAxLDEzOSwyNDksMTI0LDE5NCwyMDIsMywxMzMsMjQxLDEzLDI1NSw0LDEwNiwyMTMsMjA5LDIzMiwxNzgsMTcxLDI1NSwxNjYsODMsOTQsMjQ0LDAsNDYsMjAzLDg2LDE3LDEwLDEwNywxOTEsMjMsOTksMjM4LDE2MywyMCwxOTgsOTQsNDMsMjI1LDI0MSwxODYsNzUsNzEsMjA0LDM2LDMwLDQ3LDE3MSwxNzUsMTcxLDExMSwyMTEsMTAyLDE5NSwyMywxODEsMjMzLDE2OSwyMTgsOTcsMjU1LDIyMCw4NywyNDksMTM0LDE3OCwxNDgsMjUxLDEyLDk3LDU2LDUxLDQ4LDEzOCwxNzgsMjU1LDEwMiw0MSwxNjMsMTQyLDEzMSw3OCwxNzUsMjI0LDE5LDEyNywyMDcsMTUzLDE3LDc1LDEyMCwxNDcsMTcyLDIxMCwyMjgsNDEsMTU3LDgsMjUxLDIzNCwyMiw1MywxNzEsMTkxLDExNCwyMDg=';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTE3LDE3MCwyMTEsMTIxLDg1LDQwLDEyMCw3Nyw2NSwzMywxNTAsMjE0LDk1LDE3Niw3MiwxNzMsMjQ0LDUxLDIzMSwxODcsNCw3MCwxOTIsMTMzLDIzMSwxMjIsMTksMTY5LDE4NywyMzksNDEsMjIzLDkwLDM4LDg5LDIwLDE1Miw1Myw2MCwxNDcsMTIxLDEyNiwyMjEsMTM3LDM0LDM1LDE1Miw2OSw2OCwxNiwxODIsNTUsMTMzLDYzLDE0NCwxMDUsMzcsMTUxLDI5LDIzNywyMjgsMTMsMTIxLDIyMywxMTgsMjM5LDE3NSwyMTgsNzIsODIsMzUsMjU1LDExLDEzMCwxOTcsMjAyLDE2NCwxNTMsNCw2MiwyMTAsMTkxLDQwLDIyNywyNCwxOTgsMTIsMTI2LDYsNzksMjI3LDU4LDE0NiwxMjYsNzIsMjIyLDI2LDI0MSwxNzYsMTI2LDU4LDEzNywyMzksMTc3LDIxMCwxNzcsMTM5LDE2NSw4MiwyMDksMTY2LDEwMSwxMTUsMTksMTc5LDUsMTE3LDQ4LDE2MywxMTYsMTkwLDE0OSwxODUsOTEsNjYsMjA0LDE3MywxNzQ=sQia4XQJLEYdh//rRZw8G86Vjn4tD1ZgMGXSOT/XhUwRZ1La1nN+8QNCa/SV8W0+oDy1tLJBLPuHR2/6KhbhVF/UrOkuOcaKHqewYi31LJUP+x5lSgTT6GqH7OJ9SPVqQSvQHg4OsxRciiTxmQP2K62CP5FQmjuqNTBbwo5oE3vnTIAnddUs8tG4PttpwxGhMQ+jV";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1540");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Vínculo não encontrado para a pessoa física e plano informados");
        expect(response.body.campos[0]).toHaveProperty("campo", "PessoaFisica");
        expect(response.body.campos[0]).toHaveProperty("valor", "52");
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Sem Forma Pagamento - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Sem Forma Pagamento - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 52 ContratoPlano = 254  { "TipoPessoa": 1, "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"  }   
        //MARCIA CORTEZ BRANDANI GIULIANO
        const sinqiaRequestHeader = 'NDIsMTUzLDQ2LDIzNiwxODcsNTYsMTQyLDE4NywyMzEsMzQsMTUsNjMsMTU0LDE1MywxNDYsMTU1LDExMSwyMjksMTAyLDg3LDEzNCwyNDgsMTk3LDE2LDE5LDI1LDQ1LDIzNywxNjMsMTQzLDExOCwxODksNjYsMjAsMjMxLDc1LDU1LDg2LDIyMSw4OCwzMyw2MCwyMjYsMTc3LDY1LDExLDk1LDc4LDk4LDIxNCwyMjcsMTk3LDEzLDY0LDMzLDIxMyw5OSwyNTIsNDUsMTI1LDIyMyw5MywxMTQsMjI5LDIxNSwxODgsMywyMjcsNzcsMTU5LDc3LDc2LDEwMywyMzUsMTc3LDEsMTk1LDExMywxNDUsMTExLDIwNCwxNzcsMTczLDY4LDE3MCwzOSwyMzEsMjE0LDE3LDE5NCwxNTEsNzAsMjYsMjMwLDE5OCw0NSwxMjMsMTQwLDEyMywxOCw5MSwyMDQsMjksMjE4LDEyMiw4MSwxNDAsMTA2LDg3LDg4LDYsMTkyLDkwLDEyNCwxMzAsNjcsMjMzLDQsMTg5LDIwMCw3MCwxMDUsMTI2LDQ0LDIxNiwxNjksMjE5LDIzMg==';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NDMsODAsMjIxLDEyNiwxNCwxMTYsMTkyLDM1LDEwLDI0NSwyMDEsMTQ5LDM5LDc3LDEzNiwxMTIsOTIsNjEsMTAwLDMyLDc0LDE5NywxMTAsMjQ1LDI1MSwxOTYsMTkwLDE0MCwxMTMsMjAzLDQ3LDI0LDE2MywxMjQsNDcsMTU1LDI1MCw3OCw4MCwxODcsMjEyLDE3MywzNCw3OCwyMzQsNjIsNTgsOCwyNTIsMzMsMTYxLDcsNjYsMjAzLDE2MSw2NSwyMzIsMTU5LDQxLDI0LDIxLDc2LDcwLDE3MiwxNTcsMTA0LDI0NCwyNDIsMTg0LDQxLDIyMywxNDYsMTI2LDI1Miw0NywxODEsMTQ2LDk0LDIxNSwyMTcsMTkyLDE2OSw0MSwxODEsMTI0LDE0OCw0NiwzMyw5NSwzMCwxOTEsMjMyLDI1LDQ0LDEyOSwxMDMsNTYsNTksMzcsMjE1LDI0NywyNTQsMTk2LDQ2LDIzNiw4Miw4NCwzNSwxMTksMTQ1LDI1MSw0LDc2LDEwNCw1Niw5NCwyMjIsMTksMjQ5LDIxNCw0MCw3MCwxMDgsMTQ3LDUsMjM4LDE3LDExMw==sQia4Aij1CSsKu49uI9jd8WqEoUItqy7bM5ar7x9nqu8LEGiJHPXy6g5XV+JLlG1IbdxkXDw0RlWiWy6wGqV7MPFTSbrGRKqlHFs8Tb4Tx12MXeVP7y+u2gf3HHoUsOZxcXUKXrq9Vn/BJLFdWLzKoP2rznYiQbTEqygHJ/e5BsbVNon1QZJwOX0LkfnOO6QUl8zC";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1538");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Forma de pagamento deve ser preenchida");
        expect(response.body.campos[0]).toHaveProperty("campo", "FormaPagamento");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Com solicitação alteração Pendente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Com solicitação alteração Pendente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 1021 ContratoPlano = 399  {   "Banco": 341,   "Agencia": 25,   "NumeroContaBancaria": 123456,   "DigitoVerificadorContaBancaria": "0",   "TipoPessoa": 2,   "FormaPagamento": 1,   "FormaPagamentoEmp": 1 }
        const sinqiaRequestHeader = 'MTU3LDU3LDE1NSwxNzAsMTg3LDI1MywxMTQsMjM4LDAsMjAxLDIxMCwyNDksNjgsMTg4LDE5NiwxNTUsMTMzLDEwNCwxNTksNDcsMTAsNTQsMjE1LDEyNSwyMzksOTIsNzQsMzMsMjQ5LDE3NiwxMzUsMTk4LDEwMywxMCwxNCwxMjYsMjI4LDE2NSwxOSw2MSwxNjksMjMzLDEyNSw1MiwxOTIsMjU0LDY5LDEwMyw0Miw5MCwxLDE0MywxOCwxOTQsMjM1LDE1LDE0NywyMDUsMTM4LDEyMiw4LDY4LDQsMTAzLDE3LDExLDIzNSw1NSwxOSw0MSwxMDMsOCwxMzcsMTUxLDE2OCwxODUsMjA4LDE4OCwyMzgsNTgsNDQsMjEzLDE2NCwyOCwxMDEsMTM4LDE5Myw1Nyw4NSw1NywxMDYsNjcsMTEzLDE4MCwyMTMsOCwxNTUsODgsMTc5LDYxLDYyLDkyLDIyMiwxNTgsMTExLDEwMyw5NywxOTksODMsMTExLDIwNiwxNzEsMTcsODgsODksNjIsNTksMTc1LDE3NywyMzEsMTEwLDEwMiwyMjcsNjYsMTkwLDE2NCwxNjUsNTE=';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NjMsODgsOTAsMTE3LDUyLDE3MCwyMjksMTM4LDMzLDIxLDIxMiwyOSw1OCwyNiwxMDEsMjQ4LDQ5LDcyLDE3Nyw5MSwxMCwxNzIsMjA1LDIsMTcsMCw2NSwyMjAsODUsMSwxNiw2MiwxMiwyNDEsMjI5LDAsMTU0LDE1MywxODQsMTYzLDI1MywyMTQsMTM1LDEzOSwxMzAsNjksMTYxLDMsMTIyLDIwMiwxNzgsMjQ3LDE0MCwyMjIsODQsMTY4LDExMywzMiw0Niw4MSw0NywxNzUsMTU1LDQsMjUyLDg2LDEwMiwxLDE0OSwxMTYsMTkyLDE3OSw0OCwyLDEwNSw5NiwxMjAsODgsMTIsNTIsMTIyLDU5LDIwNSwxMCw0MiwyMTQsMTkwLDEyLDY0LDEwMCw3MSwxNDIsMjQ0LDE3Miw4OSwxMzcsMjMxLDEwNyw0Nyw4OCwyNTIsNzAsMTU1LDI0OSwxNjYsMjQwLDIxNyw0NiwyNDIsNDgsMjcsNTYsNTUsODQsOTQsOTMsNzAsMTAwLDQwLDIzLDE4OCwxOTgsMjAsMjIzLDIzNywxNjcsMTUzLDQysQia4ZYnzApowSmd5pP0+xRIlfHH+A47WgrWJAUOYhGLtyLXdaOxTG6cm63j39njcUHckhvUTR8HlQxIXvF39jAEA0+2iOTUYVaBYXKWmUQK8RxU0ZbxLRIcJc+HzTOeHBLeegRwxxhiFSmp4H5DOv9wYsSZjcoHpsyzJR2s8CJHUwdiWgizorlS4MoGwzoouuWUySlD80HHT601IcUhyU8SPYA==";       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-proc-0001");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Ja existe uma solicitação pendente para este participante e por este motivo não será possível prosseguir com a solicitação atual");
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Parâmetros de Consulta Nulos - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Parâmetros de Consulta Nulos - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = null ContratoPlano = null  {   "Banco": 341,   "Agencia": 25,   "NumeroContaBancaria": 123456,   "DigitoVerificadorContaBancaria": "0",   "TipoPessoa": 2,   "FormaPagamento": 1,   "FormaPagamentoEmp": 1 }
        const sinqiaRequestHeader = 'MTQ5LDc0LDg1LDExNywxNCw4MSwyMTYsMTk3LDIzLDIyOCwxMTQsNjUsMTE2LDE0MCwxMjQsMTUxLDg4LDY4LDU4LDE3MSw5LDEwMiw4NiwxNzMsMzAsOTUsMjAyLDI0NywxNDIsNDUsMTI3LDE3MiwxNTksMTQ4LDU1LDMwLDIwNSwxNDIsMTI3LDIxNSw3MywxNzEsMzcsMTA4LDEyNCwyMjcsNTcsMzYsMjM3LDE1MiwxNTIsNjAsMjE5LDcwLDI0MSwyMSw4NSwxODUsMzksMjM5LDEwNiwxMDgsMTg1LDQsMTM5LDIzLDczLDgyLDgzLDEzMSwxMTMsMTAwLDE3LDAsMjQyLDE2OCw1MSwxOTEsMTUsNiw4Nyw1NCwxLDEyMCwxNDksMjA3LDkxLDM1LDEyOSwxODQsODUsMjM2LDE4MCwxMDcsNjMsNzMsNSwxMDYsMTg5LDIzMiwxMzUsMTExLDg3LDExMSw2NSwyMzMsMjI4LDIwMywxODUsMzIsNDksMTExLDEwNCwwLDI0OSw1MiwxNzYsMTU5LDIyOSw3Nyw4OSw1OSw1OSwxNzEsODYsMTMyLDI1MiwxOQ==';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTA0LDIxOSwxMTcsNDUsNjYsOTYsODcsMTYyLDE1NiwxODksNDYsMTEsMzQsODQsNzYsOTIsMTcwLDUwLDgyLDc2LDIzMSwxMDQsMjM5LDEzNyw1NywxOTEsMSw1OSwxNjUsMTQ1LDEzMiwyNDcsOTAsMjI5LDEwOSw1OCwxOTUsMTMyLDI1LDI2LDAsMTQzLDIzNiwyMTYsMTY2LDEzNSwxMjQsODAsMTUxLDM4LDE5Miw4NSwyNiwyMTUsMzcsMTY5LDY3LDEyLDEyOCw5NCwxNjEsMTMxLDc2LDM0LDIyLDUzLDI0LDM0LDI1MCwzOSw5Nyw3MywyNDcsMjMxLDI0MSwyOCwyMDAsMTY5LDE1NCwxNjMsMTA1LDEzOCwyMDIsMjI0LDE1LDExMiwxMDIsMjQ3LDkzLDEyMSwxMTcsMTEwLDEwOCwyMTIsMjM3LDgsMTY1LDYsMjAzLDg1LDIyMywyNTIsMzksMTc4LDE0NSwyNDAsMTI2LDExNCwxNjAsMiwxNjMsMTgzLDUwLDI0NSwzOCwxNzAsMTU4LDE2NywxMTgsOCwxODMsMTU4LDcyLDEyNCwxNjEsNjcsNywzNA==sQia4ZYnzApowSmd5pP0+xRIlfHH+A47WgrWJAUOYhGLtyLXdaOxTG6cm63j39njcUHckhvUTR8HlQxIXvF39jAEA0+2iOTUYVaBYXKWmUQK8RxU0ZbxLRIcJc+HzTOeHBLeegRwxxhiFSmp4H5DOv9wYsSZjcoHpsyzJR2s8CJHUwdiWgizorlS4MoGwzoouuWUySlD80HHT601IcUhyU8SPYA==";       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("Message", "The request is invalid.");

    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - ID Pessoa Inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - ID Pessoa Inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 9999 ContratoPlano = 399  {   "Banco": 341,   "Agencia": 25,   "NumeroContaBancaria": 123456,   "DigitoVerificadorContaBancaria": "0",   "TipoPessoa": 2,   "FormaPagamento": 1,   "FormaPagamentoEmp": 1 }
        const sinqiaRequestHeader = 'MTUsMzIsMTksMTI0LDIyNCwxNzQsMTEzLDQzLDU0LDEwLDE4OSwyMDEsNTQsMTUsMjUwLDk5LDExMSwxMTUsMTUsMjAzLDAsMTM1LDE5MiwyLDE4MiwxODgsMTU1LDc5LDE0MCwxMTQsMjEyLDE4NiwxMzAsMjA5LDIyNiwyNTMsMjAyLDgyLDExNywyMDAsMjEzLDEwMiwyMzIsMjIwLDE2MiwxMiwzMSwxNzEsMzksMTk1LDI1LDMsNTksMTA4LDM1LDE2MCwxMjYsODEsMTkzLDQ1LDkzLDE5OCwyMzksMTIxLDEsMTI0LDIyMywyNDMsMjM2LDExMiwzNiwyNDMsMTMxLDEyLDk0LDI0MywyOCwyMDIsNTMsMjQ3LDE0OCwyNTIsMjUsMTY0LDIwMywyMzIsMTg5LDE5MSw2MywxMDcsMjA4LDI0MywyMzMsMTI0LDE1Niw0NCw3MiwxMDksMjMxLDE5NCwxODgsMzUsMTM5LDQzLDU3LDE5NCw1LDEsNTQsMTk3LDEzMywzMCwxMDYsMTQ0LDEzMiwyMTQsMjQ2LDQyLDEyOCwyMjEsNjYsNTgsMzgsMjMwLDExMCw2NywxOTUsMTg1';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NTAsMjEyLDIwMiwyMCwxNDcsMTE3LDE4MywxODgsNTksMTI1LDc5LDExOSwxNTQsODgsMjU0LDk5LDExLDg2LDE3MiwyMywxMTUsMTQ4LDE5MCw4NSwxMTcsMCw5NywzMSwyNSwyMTgsNjQsMjQ2LDM0LDI1MiwyMjAsNTMsNTYsMTQ1LDI1MiwxNzAsMjM3LDI0Niw2NSwxMDIsMjYsNTcsOSwyMzksNzksMjQ0LDIzMyw0NSwxMzksMTkxLDIxMCwxNTMsMTg3LDE4Miw1NSwyMTUsMTM3LDcxLDY1LDE3MywzNyw0LDIyMSwxODIsNjcsNTEsMzQsMjAxLDI0Myw2LDE5MSwyNDQsMjI2LDE2MSw5NCwyMTYsMzQsMTcyLDE1MCwxODYsMyw2NywxMTgsMjQ0LDIxNiw0LDMwLDAsMTM0LDE5NCw0OCwzNCwyNTEsNjAsNTUsMTg0LDI0NCwxNTUsNDgsMjE4LDEzNiw1NywyOCwxMTUsMjEwLDEyMSw1NCwyNTIsNjMsMzcsOTAsMzQsNDcsMTI2LDMzLDE4MCw5OSwyMzQsMTIxLDI2LDc0LDY4LDM5LDE2Ng==sQia4ZYnzApowSmd5pP0+xRIlfHH+A47WgrWJAUOYhGLtyLXdaOxTG6cm63j39njcUHckhvUTR8HlQxIXvF39jAEA0+2iOTUYVaBYXKWmUQK8RxU0ZbxLRIcJc+HzTOeHBLeegRwxxhiFSmp4H5DOv9wYsSZjcoHpsyzJR2s8CJHUwdiWgizorlS4MoGwzoouuWUySlD80HHT601IcUhyU8SPYA==";       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1540");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Vínculo não encontrado para a pessoa física e plano informados");
        expect(response.body.campos[0]).toHaveProperty("campo", "PessoaFisica");
        expect(response.body.campos[0]).toHaveProperty("valor", "9999");
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - ContratoPlano  Inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - ContratoPlano Inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 1021 ContratoPlano = 999999  {   "Banco": 341,   "Agencia": 25,   "NumeroContaBancaria": 123456,   "DigitoVerificadorContaBancaria": "0",   "TipoPessoa": 2,   "FormaPagamento": 1,   "FormaPagamentoEmp": 1 }
        const sinqiaRequestHeader = 'OCwyMjQsMTkwLDE0MiwxOTIsMjcsNDUsODUsMTIwLDMxLDExNyw0MCwyMSw3MiwxOTUsMTYyLDIwNywxMzIsOTksMjE1LDE5NCw2MCwyNDIsNDQsMzQsMTU4LDIxMSw0NSwyMjYsNjIsMjM2LDE2NSw4OSwxMDEsMjAwLDk4LDE2MywyMywyNiwzMiw1NywxNTcsMjU0LDExOSwxODYsMTM0LDE3OCwxNCwxNiwyNDgsMTU0LDE5NSwxODEsMzksOTYsMjQsMTUsMTExLDQzLDI3LDIxNywyMjQsNzAsMTMyLDcxLDIzMywyMjQsNSwxNjQsMTkwLDEwOSwyLDg4LDE0MSwxMTUsMzcsMTExLDU4LDMsMTc1LDIxMywxMjIsNDAsMTc2LDE3LDcxLDEyNiw0NSwyMjMsMTUzLDMwLDg5LDE1MCwyNTUsMjQ2LDEyNiwyMCwxMDUsMTczLDkzLDczLDQ0LDIxNSwxMjIsMjEyLDM5LDE1NywxOTksMTI4LDIzNSwzMiwyNDQsMTQzLDYyLDIzNCwxODMsNDUsODEsMTMyLDQ1LDIwNiwyNywyNDIsMTA0LDE3MywxNzgsMjI5LDI0NA==';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NjksMSwyMDgsMiwzNiw2OCwxNTEsMjEyLDE3OSwyNTUsMjM5LDc0LDExNSw3MCw5MywxMTksMTE5LDE0MywxMTIsOTIsMjEzLDU2LDI1MCwyMTksNTEsMTA1LDUwLDc5LDU4LDI1MCwyMzQsOTAsNSwyMDYsNjgsMjIyLDIwMywxMTUsMzEsNjcsMTI5LDI1NCwyNTEsMjMsNDksMTU0LDI3LDY0LDk0LDI1MSwxNzIsMTIyLDk2LDIyLDUxLDExOCwxMjAsMTYsNTMsOTEsNjAsMjA4LDExNCwxNTIsNzUsMTM4LDIxOSwxNDMsODEsMjQsMjU0LDk2LDIzMSwyMzksOTYsMjQ1LDc4LDQsMywyMzksMTc0LDIxLDIxOCw4NiwxMDEsMjUwLDE4MCw5MSw2OSwyMjMsMjQ3LDU2LDEzMywzOSwxODUsNTIsNjUsMTYwLDUzLDEzMywxNjgsMTI0LDE5NCwyMDgsMTYsOCw2Niw4NiwyMTgsMjE5LDEzMyw2MiwyMTQsMjIzLDE3OCw0MCwxNDgsMTM5LDM3LDUxLDI0MCwyMTQsMjAzLDUyLDEsMTUyLDE5NywxNDk=sQia4ZYnzApowSmd5pP0+xRIlfHH+A47WgrWJAUOYhGLtyLXdaOxTG6cm63j39njcUHckhvUTR8HlQxIXvF39jAEA0+2iOTUYVaBYXKWmUQK8RxU0ZbxLRIcJc+HzTOeHBLeegRwxxhiFSmp4H5DOv9wYsSZjcoHpsyzJR2s8CJHUwdiWgizorlS4MoGwzoouuWUySlD80HHT601IcUhyU8SPYA==";       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1044");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Contrato do Plano não encontrado");
        expect(response.body.campos[0]).toHaveProperty("campo", null);
        expect(response.body.campos[0]).toHaveProperty("valor", "999999");
    });

    it.only("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta sem dígito - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta sem dígito- Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 124 ContratoPlano = 254  {   "Banco": 341,   "Agencia": 1,   "NumeroContaBancaria": 1167,   "DigitoVerificadorContaBancaria": null,   "TipoPessoa": 1,   "FormaPagamento":1  }
        const sinqiaRequestHeader = 'ODYsMTU1LDI0MCwxMjUsODcsMTU3LDI1MiwyMzEsOSw4NCw2OSwxMjAsNDYsMjQ0LDIwNSwxODEsMjAwLDI0NSwyMzIsMTQ3LDE1Niw2Miw3NCwyNDcsMTk2LDIzOCwxNCwyMSwxNjMsMTE4LDIwMyw2MCwxNTcsMTE2LDEwMSwxMTYsOTAsODAsNTIsMTM4LDIxMCwyNDEsOTAsNTIsMzQsODcsMTM4LDU4LDczLDcyLDE1Nyw3NSwyMzAsMjQsMjE0LDEyMCwyNDYsMTM1LDExMywyNDYsMTE5LDI0MCw1OSwxNDUsMTIzLDM3LDM1LDIyNywyMiwxNDAsMTcwLDE0OSwxMjksMzYsNzMsNzMsMTM5LDEzNSwxMzEsMjEsMTMsMjA1LDY5LDc3LDcxLDEyNiw2MiwxNzEsMTYxLDEyMCwxNzcsNjEsMTcsMTE0LDQ0LDE3NywyNCwxNTAsMCwxMiwxMDksNjAsMTMyLDU3LDEwMywyNiwyNDcsMTAwLDQ2LDU1LDIyMywyMTEsMjcsODksMTg5LDc5LDE2Myw3Myw5MCwxMTYsMjMsMTA3LDE3MCwyNDAsMTk1LDIzNywyMjYsMzE=';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NjcsNzcsMTMzLDE2Myw1MSw3MSwxNDQsOTUsMTUzLDI1NSw0MiwxNDAsMjIxLDIzMSwxODQsMTQwLDE3OSwyMjEsNjMsNjksMjM2LDc2LDI0OCwyNiwyNTEsMTYxLDE4LDE0NiwxOTksMTQyLDIyNSwyNTAsMTY1LDE4NiwxNTIsMjQwLDIxNiwxODIsMTM2LDEzNywxMTcsNDQsMjE0LDkwLDIzNyw2MSwzMCwxOTYsNjYsMzQsMTE5LDE5MSw3LDE4NSwxNSw5MCwxMTIsMTk4LDEyNCwyMywyMTIsMjQxLDcxLDEwOCwyNDksMjM4LDE5NywyNDQsMjM5LDQ3LDE0NCw0Nyw4LDYyLDIwMCw3OSwxMTEsMTc1LDE4OSwxMDksNjYsODAsMTE0LDgxLDE1MSwyMDgsMTIyLDIxNCwyMTQsODgsMjM0LDE5OCw1NCwyMTgsMTM3LDExMyw1NiwxMSwxNzYsMTc3LDIyNiwxOTksMTM1LDIyNywxNjIsNjEsMjMxLDE0OSwxODksMjM4LDExLDksOTEsMTEsMjExLDIwNywyNDUsMjI3LDE2NCwyMDQsMTQ1LDE4NiwxNTMsNzAsODgsMTQ5LDgzLDIwOA==sQia4ZYnzApowSmd5pP0+xRIlfHH+A47WgrWJAUOYhGLtyLUw45agwFtUSUaXO+LFrRdhTn/46ByIa+5cQ7vTwNzIT9MKQGs0FP+sgEYSayqjd0dTDhjuM+JNhcfsm19hc1Ta7SZlYOg6dSQs4OzJZKWjXsm235ZGSqsjqbNj/fh+smUKEbE/ajpN4rLfMTULjcLeo0G9JfpemSv0CPOiANK+eA==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1535");
        expect(response.body.campos[0]).toHaveProperty("campo", "DigitoVerificadorConta");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Dígito verificador da conta principal deve ser preenchido");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
    });

    it.only("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta com dígito inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta com dígito inválido - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 124 ContratoPlano = 254  {   "Banco": 341,   "Agencia": 1,   "NumeroContaBancaria": 1167,   "DigitoVerificadorContaBancaria": null,   "TipoPessoa": 1,   "FormaPagamento":1  }
        const sinqiaRequestHeader = 'ODYsMTU1LDI0MCwxMjUsODcsMTU3LDI1MiwyMzEsOSw4NCw2OSwxMjAsNDYsMjQ0LDIwNSwxODEsMjAwLDI0NSwyMzIsMTQ3LDE1Niw2Miw3NCwyNDcsMTk2LDIzOCwxNCwyMSwxNjMsMTE4LDIwMyw2MCwxNTcsMTE2LDEwMSwxMTYsOTAsODAsNTIsMTM4LDIxMCwyNDEsOTAsNTIsMzQsODcsMTM4LDU4LDczLDcyLDE1Nyw3NSwyMzAsMjQsMjE0LDEyMCwyNDYsMTM1LDExMywyNDYsMTE5LDI0MCw1OSwxNDUsMTIzLDM3LDM1LDIyNywyMiwxNDAsMTcwLDE0OSwxMjksMzYsNzMsNzMsMTM5LDEzNSwxMzEsMjEsMTMsMjA1LDY5LDc3LDcxLDEyNiw2MiwxNzEsMTYxLDEyMCwxNzcsNjEsMTcsMTE0LDQ0LDE3NywyNCwxNTAsMCwxMiwxMDksNjAsMTMyLDU3LDEwMywyNiwyNDcsMTAwLDQ2LDU1LDIyMywyMTEsMjcsODksMTg5LDc5LDE2Myw3Myw5MCwxMTYsMjMsMTA3LDE3MCwyNDAsMTk1LDIzNywyMjYsMzE=';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTE5LDk2LDE5MCwyNDUsMjI3LDE4MCwxODcsMjA5LDEzMCw0MywxOTMsMjI4LDE4NCwxNDEsNTEsNzUsMTMzLDE4Nyw0MCw0NiwyMDMsMzcsMjQ1LDE4NSwxNzcsMjMwLDIxOCwxMjAsODAsMjA0LDE5NywyOSwxNTgsMTczLDIwMSwyMyw1NywyNDYsOTksNDUsMTExLDIxNiwyMzEsMTM3LDIyNSwxOTUsMTgzLDExMCwyMDUsMTIzLDIxNywyMTcsMTc4LDIwMSwxNjUsNDMsMzEsMTA3LDk4LDkwLDExLDg3LDIxMCwyMjcsNzMsMTQwLDE2NiwyNDUsMTQsMTE0LDAsMjUwLDExMyw0MywxNjQsOCwyMTcsMTQ3LDIyMCw4OCwyMzQsNTgsMTgwLDk2LDIyNywxMTksMTgyLDE5NiwxNSw0Miw5OCw3MSwyMzAsMTUzLDMsMTIwLDEyMiwxNDgsMTYyLDE0NywxNDMsMTMzLDEwMywyMjcsNTIsMjEsMTE0LDQwLDcyLDE0NSwxNjQsMTEsMTAwLDE4LDIzMyw4OSwxNjQsMTExLDIwNyw5Nyw1LDcyLDY2LDEwMywzMiwxMDAsMTgyLDEzNQ==sQia4ZYnzApowSmd5pP0+xRIlfHH+A47WgrWJAUOYhGLtyLUw45agwFtUSUaXO+LFrRdhTn/46ByIa+5cQ7vTwNzIT9MKQGs0FP+sgEYSayqjd0dTDhjuM+JNhcfsm19hc1TallNmDjB92PjhzNXVqm96Cd4TMy71L5eg83AEv8utLzD9gezhDVz8B/kjP39S5Dkki89RX/dIu8EXMKK9Q69mIQ==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1537");
        expect(response.body.campos[0]).toHaveProperty("campo", "DigitoVerificador");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Dígito verificador da conta principal inválido");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
    });

    it.only("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com Empréstimo não habilitado - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com Empréstimo não habilitado - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 124 ContratoPlano = 254  {   "Banco": 341,   "Agencia": 1,   "NumeroContaBancaria": 1167,   "DigitoVerificadorContaBancaria": null,   "TipoPessoa": 1,   "FormaPagamento":1  }
        const sinqiaRequestHeader = 'ODYsMTU1LDI0MCwxMjUsODcsMTU3LDI1MiwyMzEsOSw4NCw2OSwxMjAsNDYsMjQ0LDIwNSwxODEsMjAwLDI0NSwyMzIsMTQ3LDE1Niw2Miw3NCwyNDcsMTk2LDIzOCwxNCwyMSwxNjMsMTE4LDIwMyw2MCwxNTcsMTE2LDEwMSwxMTYsOTAsODAsNTIsMTM4LDIxMCwyNDEsOTAsNTIsMzQsODcsMTM4LDU4LDczLDcyLDE1Nyw3NSwyMzAsMjQsMjE0LDEyMCwyNDYsMTM1LDExMywyNDYsMTE5LDI0MCw1OSwxNDUsMTIzLDM3LDM1LDIyNywyMiwxNDAsMTcwLDE0OSwxMjksMzYsNzMsNzMsMTM5LDEzNSwxMzEsMjEsMTMsMjA1LDY5LDc3LDcxLDEyNiw2MiwxNzEsMTYxLDEyMCwxNzcsNjEsMTcsMTE0LDQ0LDE3NywyNCwxNTAsMCwxMiwxMDksNjAsMTMyLDU3LDEwMywyNiwyNDcsMTAwLDQ2LDU1LDIyMywyMTEsMjcsODksMTg5LDc5LDE2Myw3Myw5MCwxMTYsMjMsMTA3LDE3MCwyNDAsMTk1LDIzNywyMjYsMzE=';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MzUsMjA3LDY3LDEyMSwxMDYsMTM5LDEyMywxNzcsMTc1LDg5LDkxLDQ1LDEyNiwxMDcsNjgsNjYsMTg1LDcwLDIyOSwxNjEsNzAsMjksMTQwLDQ2LDExNSwxMzQsMjE1LDEzOCw1OCwxMzUsMjQ2LDE1MSwyMjksNjQsMjA3LDI1MCwyMTksODUsMTkwLDE0NCwxNSw0NSwyNDUsMTAyLDIxNSw1NiwzMiwyMDQsMjQxLDE5MCwxNTcsMzQsMjIzLDEzMCwyMjIsNzgsNTQsOTYsMSwxNzksODIsNDcsMTc0LDEyOSw3MSwxMzIsMTU2LDIzOCw3NCw4LDY2LDU5LDMzLDIzMyw0Myw5MiwxNTgsMjI0LDEyMiwyMDAsMjM3LDE5LDE2LDIwNiw4NSwxMTAsMTk1LDg1LDE5OSwxMTEsMTIzLDE1MCwyOCw0OCwyMiw0NywzLDM1LDE3MCwxMzYsMjU1LDIzNiwyNTIsOCwxMDcsMzAsMTMzLDE3OCwyNDksMTcsMjAxLDExOSwyMTAsMTg1LDE3Nyw0NiwxNTEsMjE5LDE4NCwxNzEsNzQsMzgsOTUsNjgsNyw1NywxOCwxODI=sQia4/QqXAZXrWBU5fTcqoLdycWYvG8Kiyt/wd5mBKD49lHuP5NLPVfi7qNouL0fE0jGKlBiuLrUt0w8esa9Xig9t2J9tOeGwfHBvm9h6AWTrJHiulyfYmdVk0p18Bec0e21sZlVBOVcEES0rePQqnyS8Tu8Uoa4EQKbMuk+wFNuUN729jDYqYQr8N8gsX9YV9n1W5zKE1s9E/pxr90+Goi6FX5pN4kRg25r/gcd0g+rG7JV9C/PUd60UkpzfVNnyOB9d94WvsCb74FPlaBrXuKPfA8C++NJJta1wKRHKcFvaLCMUEaMCJaEQ/JAeQOgacvB9+a/9cCCeDiy7qqZU8Xk1wyuwCtsQrEDLZayKJegWeoal7ibDkKAHLU6RzQ8UKc17";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1539");
        expect(response.body.campos[0]).toHaveProperty("campo", "Empréstimo");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "A alteração de dados bancários de empréstimo não está configurada para a entidade e plano informados");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
    });

    it.only("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com todos os campos em branco - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com todos os campos em branco - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST - PessoaFisicaID = 123 ContratoPlano = 254  {   "Banco": 341,   "Agencia": 1,   "NumeroContaBancaria": 1167,   "DigitoVerificadorContaBancaria": null,   "TipoPessoa": 1,   "FormaPagamento":1  }
        const sinqiaRequestHeader = 'MzIsMTU5LDM4LDUwLDIzMywxMTQsNDUsOTUsMTM4LDE1NCwyMywxMTgsMSwxMCwxMzUsNDEsMTU4LDIyNywxNDgsODEsMTMxLDE0NSw5NiwxMzQsMTI2LDE2OCwxMzQsMjQ3LDE1NSwxNzAsMTIyLDIzOSwyMzgsMzcsMTYzLDc0LDIyMywxODksNjcsMTMxLDIxNCw5LDE1NSwxNjcsNTgsMjIzLDQsMjUxLDE5OSwxNzMsMTM5LDIzMywxMzQsMTY4LDE0NiwyMDAsMTIyLDE1OSw2MiwxMjMsMTc4LDEwOSwyNDYsMjA1LDI1MSwxMDEsMjMsNDksMTgwLDEyOCw4LDE3MSwyMjMsMjI5LDEzOSwxOTYsMTU5LDE5NywyMiwxMjMsMjUyLDcyLDE3MSwxOTEsMjE5LDExNiwxNzUsMTI0LDE5NCwxODYsMjQ0LDY0LDYzLDQ5LDQxLDE0MywxOTEsNzcsMTM5LDE3MCwxNzMsNjMsNDAsMTc3LDI1Miw5Niw2MSwyNywxMjUsMjUwLDUxLDEzMyw2NCwyNDcsMTg0LDExNywyNTEsMjAyLDE0OCwxNzksMTg1LDQ4LDIzOSwyMzUsMTE2LDEzNiw2NCwyMTk=';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTIwLDEsMjA3LDY5LDEwOSw0OSw3MCwxODYsMjIzLDQsMTY0LDEzOSwxNTAsMzEsMjM5LDI1MSwxMCwxMzEsMjE2LDIxLDE0NSw2NSw1MCwxNTksMjI5LDk3LDIzMCwyMTIsMTMyLDE5OCwyNDUsNzYsMjM4LDEyMCwyNSw3NywxMDksMTA3LDY1LDc2LDE1MCwzOCw5NCwxMTYsMjA5LDUzLDE0NywxMDMsNjcsMTQxLDE2MCw1NCwxNzcsNzMsMTcyLDE0MywxNjIsMjAxLDIyNyw2NSwyMjMsMTEzLDE3NSwxNTAsMTk2LDUsODEsMTI4LDEyNSw5Niw4NCwyNDUsMjgsMTMyLDE2OSwyNTEsNzYsNDYsMTk1LDIwNSwxNTEsNzMsMjIsOTgsMTg5LDEwOCw2NiwyMTksNjcsMjEsOTAsMTE4LDE4MiwyMzQsNDIsMTgyLDc0LDgzLDE1MCwxNDgsMTczLDU0LDI1LDM3LDYxLDE4OSw0MSw0OSw2NCwyMTgsNTMsODAsMTg0LDIsOTYsMTk5LDIzNSwyOSwxODcsMTMxLDE4Niw0LDMzLDI0MywxMjEsMjI2LDE0MCwyMTY=sQia4/QqXAZXrWBU5fTcqoLdycWYvG8Kiyt/wd5mBKD49lHuP5NLPVfi7qNouL0fE0jGKlBiuLrUt0w8esa9Xig9t2J9tOeGwfHBvm9h6AWTrJHiulyfYmdVk0p18Bec0e21sLybS/kL1FIHU1NdG+P+3L7eEKeWfUjyv05f6piIOp1D94e7qgQSzFgZWCI+TM5k5MExZdHNRxFKy4dP1je30rQ==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1540");
        expect(response.body.campos[0]).toHaveProperty("campo", "PessoaFisica");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Vínculo não encontrado para a pessoa física e plano informados");
        expect(response.body.campos[0]).toHaveProperty("valor", "124");
    });


	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
