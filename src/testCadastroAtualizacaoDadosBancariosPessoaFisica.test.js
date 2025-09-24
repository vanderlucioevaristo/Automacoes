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
        

        // body {   "PessoaFisica": 39,   "ContratoPlano": 254,   "Banco": 341,   "Agencia": 1234,   "NumeroContaBancaria": 1234567,   "DigitoVerificadorContaBancaria": "4",   "TipoPessoa": 1,   "FormaPagamento": 1, }
        const sinqiaRequestHeader = '';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NDcsMjQ3LDIyOCwyMDksMTM3LDIyNSw0MywyMzcsMjEzLDIxMiw0MywxODEsMTQ2LDE1NSw2MSwyMDYsNjQsMjQ2LDEwOCwzNCwyMjksMjM4LDE2MywyNDgsMTQxLDQsMTg3LDg1LDI0NiwxNTUsMTc3LDIwLDE4MywyNDYsMjcsMTA0LDcxLDI0OCw4MiwxNTAsMjQsMTMzLDEzMywxNDQsMTg5LDI1LDIwOSwwLDE2OSwyMTYsMTgyLDE0MCwxMTYsNjgsNTMsNTUsOTUsMTkxLDE0MywxMjcsMTEwLDE3MSwxNTcsMzIsMTQ1LDc0LDIyNCwxNjUsMjE0LDE0NywxOCwxMjIsMjIzLDk2LDIzOCwxNDYsNTgsOCwxNTAsMTc4LDE1MiwxOTMsMTgxLDE5MywyMDAsOCwxNzMsMjQxLDIwMSwyNTMsMjA3LDc4LDE3MCwxOTgsMTQzLDExMiwzMywxMDEsMjIwLDIxLDI1MywyMjMsMTMyLDQ3LDE0Miw3NCwxNDksMTUyLDcxLDIwOCwxNTYsMjUxLDEyLDE3NiwyNTAsMjI3LDM5LDEwMSwyMzIsOTksMzUsMjAwLDcyLDExMiwyMDEsMTU2LDIyLDIxNA==sQia4ZbdD40r7MKW2Q/G2H983TsMLByC1oeJhn/srouK35IvZ97EmItfPX4soYjmH0KRPPntG/Qcks6Zi+7bXSsEgaHMVIoSRPBj6APu8oEWpWKLDcvsCFk2gwKHe/qHH/7BZ8nYthMy07X1DHjOF+1DUs+d/sAxq1gKXaWCzp1Bf3/zqvhPKNWxfOKaX+5/WoJWHACcC+/E/YjAYP18xIVqMLy//QahA95AEHozshrHjQSuxNL+dYoVv98S/4zzl1Zlogum1XgTnVN9/NgAkuKNvbA==";
       
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
        

        // body {   "PessoaFisica": 597,   "ContratoPlano": 254,   "Banco": 341,   "Agencia": 1234,   "NumeroContaBancaria": 1234567,   "DigitoVerificadorContaBancaria": "4",   "TipoPessoa": 2,   "FormaPagamento": 1, }
        // CLAUDIA DA SILVEIRA
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //JOSE TARCISO MORI
        corpo = "MjUsMTE3LDI2LDIzNywxNjgsNTYsNSwyMCwxODQsMTgxLDIyNiwyMzksMTgyLDIyOSwxMjAsNDksNDgsMjAsODksMTIwLDE0MCw5MSwyNywyMTcsNzIsMTY1LDc4LDEzMSwxNzIsMTYxLDYsMTY5LDczLDEwOCwxNjgsMjM2LDM2LDUzLDIyOCwxODIsMTE3LDEwMywxMDQsMjQ5LDkzLDEwMSwxOTksODcsNjksMjUzLDEzOCwxMTYsNzQsMzEsMzIsOCw1LDE3MiwxMzUsMTEyLDEzLDQzLDIwNyw0Niw4MSwxMjIsMTQsMTI3LDczLDEyMSw2OSw2OCwxNTQsNzMsMTA3LDIzNSwxNjYsMTYwLDExOCw4LDk1LDgzLDEwNCwyMjMsNTMsMTY0LDIyMywxMzEsMjEyLDIxMSwxMDcsMTYsOTQsNDIsMzksMTEzLDEyOCwxMDMsMTc1LDExOCwzOSw5LDEzLDEzLDIwLDE5LDI0NCwxOTgsMjQzLDU2LDE4NSwxMDMsMTEzLDExOSw2OSw4OSwyNTEsMTA1LDI4LDEyNiwyMDMsMTcsNTYsNTgsMzgsMjM5LDE3MCwxNjU=sQia4ZbdD40r7MKW2Q/G2H983TjPNDdwb0cYgrI9tgpK9eQBNFtFykWceSVZu8+88ejETY/eA9dXHJmcu9Yo3coQCW6wF+y5Ycje++iUlvZvULAZdA9I+VvWqR8VsaNXhs8wi3LojHPuo+oKxTpvwUr7k2Wy7gtDtiZh86th8gLyV2xqTcPXHvcBNntNssn3PMa+a5MHmMgJNTkgpCI/jxyquXwg5FHFOM3uPYCm8d+BL6qTOEebwWNH7p5JNrEOifyLz42NGgA8LZV7gSWMAHuienQ==";
       
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
        

        //body {   "PessoaFisica": 44097,   "ContratoPlano": 254,   "Banco": 341,   "Agencia": 1234,   "NumeroContaBancaria": 1234567,   "DigitoVerificadorContaBancaria": "4",   "TipoPessoa": 3,   "FormaPagamento": 1, }
        //ADRIANA CARVALHO DA SILVA
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        //SORAIA ADRIANA SILVA DE ALMEIDA
        corpo = "OTQsNzMsMjgsMCw3MiwxNjMsNDAsMTI3LDEwOCwxLDI0Myw5MywyMywyMTcsMjU1LDg4LDIzMCwyMDIsMjIwLDM3LDE2MSw3NSwxNywxODUsNjQsMjMsMjQ0LDE5MSwyMzIsMTI4LDEyNywxNTIsMTM2LDExNiwyMzMsNTksMTQ1LDIxMSwxODAsMjgsMTI5LDY4LDEzMSwxODMsMTU2LDI2LDE4NiwxMTMsMTg4LDQsMTg2LDEyNywyMTQsNTksMTAwLDAsMTk3LDE1OCwyMjUsMjIsMTI0LDU4LDIwMSwyNDIsMjMyLDE4NCw5LDg0LDI0OSwyMTYsMjQ5LDIyMSwxOTEsMjQ0LDEzNiwyMzcsMTAsNjAsMTcwLDY2LDE1NSwxNjQsOTksMTg2LDk1LDEyMSwyOCwxOTQsNDIsMTAxLDI0OCwzOCw3MCwxODEsNDQsMTY4LDE3OCwyMDYsMjExLDksNjUsMjUsMTcwLDIzMywzMSw4MCwxMzIsMTg0LDg1LDU0LDEzMywzLDIxMCwxMTAsMTEzLDE2Nyw3NywxNTMsMjM0LDgwLDIwMCw3OCwxNzgsMjIwLDIwOCwxNTAsOTAsOTE=sQia4ZbdD40r7MKW2Q/G2H983TmDTjz25jlp5mgGpaYpNEa+05mzCROkjRJlFVtVh0sovB67XILhBBcGeAArOG0JMzFNsCpE7u1FeWfcwmwQgs4R39yqJvtldfz88NrY61LhGJu+R/5uOuVKRet0s+1Jp6z4n9mg+KarUFcfjSow3ftUoWVQes3zD4f3JMNtivl1POG4lZXQ8DQ8USqcE8ZVXviceHYDy2krcYlFFQ8FCEHyrXuascQgESa0E0pB5fI7jpgn2XbebyDb4+nFIc3sjSg==";
       
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
        

        // body {   "PessoaFisica": 101802,   "ContratoPlano": 192, "TipoPessoa": 4,    "FormaPagamento": 1,     "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"}
        //GABRIELA CALVO GARCIA
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "OTQsMTMwLDI0NiwzMywyMiwxOCw0NCwxNzcsMTgsMTA4LDI0OCwxMTgsMTM3LDEzMyw0NCwyNSwyNDAsNzksMTM3LDEyNCwxNDksOTUsNiw1OSw5MiwyMjYsOTAsMjMsMjUyLDIxMSwxMDUsMTI1LDE4OSwxODUsMzAsMTkwLDgwLDEzMCwzOCw2MSwyNDQsNjksMTI3LDM5LDE5NywyMjksMjA2LDEsMTU5LDEzMywyMzMsMTIyLDIyLDg0LDQzLDEzMSwxNTMsMjIyLDE4NiwxMjcsMjA2LDIxNywyMzIsMjEzLDg2LDEyNCw0MywxODMsMTk1LDYzLDExOCw1Myw3NCw5OSw1NSw1NSw3LDEyOCw5NiwxMTksMTExLDI0OCwxNTIsMTE3LDE0MiwxNjgsMTA4LDIzMSwxMzQsMjEsMTAsNDgsMiwyMTMsMjI1LDU5LDY5LDEyMCw4MCw2MCwyMDAsODcsMTIzLDIzMiw1LDYsMTg5LDE3MCwxNTQsMTM5LDEwNiwyMjMsMzQsMjU0LDE3Miw4OCwyNTQsMjM3LDE2MCwyNiw1LDcxLDE1MSwxMDIsMjIyLDI3LDIwMCw0Ng==sQia4ZbdD40r7MKW2Q/G2H983To3fVSlOwdrb1jCaQMqJj7CMM2Y7xG04DZSIxNbrFqNl93NWcK9p9SjmBA9DPxxQQ8gL0qJ/AZlGqjcBJa+wEKL42aBvAG2+8Nf0tcDucJV1WwbL9nIksabElcipTN1J1Ld+lVuFBIdtOAaFTphyGmhbY8328UUIRVP5jDkg80AaYOuBvom0U1gFLqT3ZaVhI/rOnz2exKd8dsyccPSWOv5eC6+totyMmJcs6nSBu8lJW+AsuwSQ3vEBLulMaamhaQ==";
       
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

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração tipo pessoa inválido - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração tipo pessoa inválido - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body { "PessoaFisica": 101802,   "ContratoPlano": 192,  "FormaPagamento": 1     "Banco": 341,    "AgenciaA": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"}
        //MARCIA CORTEZ BRANDANI GIULIANO
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NCwyNTUsNTIsMTcyLDkxLDIyLDQ3LDE0NSwxMCwyNTUsMjE0LDE5OCwxNzUsMTc3LDEwOSw4MCwxMDcsMTIsMTY3LDEzNiwzNiwzNSwxNzcsMTQsMjUyLDIxMiw5OCwxMjUsMTUsMjA1LDU4LDkyLDM0LDE5MiwyMjYsMTg5LDIyNiwxNjYsMjYsMzAsMTkzLDE5NiwxODUsNjEsMjE5LDIyOCwxODIsMTk4LDIwNSw3OCw4MSwxNCw5MSwxNTcsMjQ5LDE3LDEyOSwxODcsMTA1LDIwLDIzNSwxNzQsMTkxLDExOCwxMTUsNzcsMTE4LDI0NywxMzcsMjUwLDE2NiwyNCw1Miw2Miw1MiwxMTQsNiw3NiwxMzgsMTA5LDIxNCwxNjksMTYsMTg1LDEzOCwxOTQsMTYzLDIyMSw1MiwyMTksMzUsODAsMjE2LDI0MCw1MywyMTYsMTc1LDIyMywyMTgsNTQsMywxNDQsMTM1LDk1LDgxLDg3LDExMywxODIsMjAzLDI0NywxNzEsMTA1LDE0OSwxNTgsMTk1LDIzNSwyNTQsOTMsMTEwLDIwOCw1MSwxMCw4NywxLDY3LDEyOSwyMTksNDE=sQia4JXhUGpcnhu+70v3MYNWZZV1BiUqyCO5oh/aEcu1BUGysAA6bK6cE97qWHUnAoXaKOfu0ctQLGP82+qVRGmWDNBnqtbnI8Y1PxZ0fw2Tp1G4BvpeVWKyxbVCYhlaw1dMQTaRDYEGIHOi45N/93MKdfLSvMaRz2oku30g7WbBjvov1EMJYp5iSphwFarOBKX9yH/tejAuuvqFPaLJYC4Bt7OUQcwvZfPoZ6eGfwLF3m1BDCaYw/0ctkmdV8gMqIZr5";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1541");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Dados bancários inválidos");
        expect(response.body.campos[0]).toHaveProperty("campo", "DadosBancarios");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Sem Forma Pagamento - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Sem Forma Pagamento - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {"PessoaFisica": 52,   "ContratoPlano": 254, "TipoPessoa": 1, "Banco": 341,    "Agencia": 1234,    "NumeroContaBancaria": 1234567,    "DigitoVerificadorContaBancaria": "4"  }
        //MARCIA CORTEZ BRANDANI GIULIANO
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NDksMjEsMjAzLDQ5LDEyNiwyOCwzNCwxNDcsMTIsMTk0LDIwMiwyMjksMTAyLDExOCwxMjgsOTQsMjUyLDIyMiw1MiwxOTMsNywxOTEsMTEsMTc0LDI1MSwyMjUsMTc0LDE5NywxNzgsMjQ0LDcwLDQwLDE4NSw4LDExMyw1MCw1NiwxMDksMTEwLDIxNywxMzMsMTI4LDEzMywxODksMjA2LDE5MCwxNDksMjU1LDk3LDI1MSw3NSw4MywyMjksMjUyLDE4OCw5MSwxMzksMjA2LDE3NSwxMjEsMTA3LDY1LDE1LDE1Myw5Niw5MSwxOSwyNTUsMjQ4LDI1MywwLDIyNSwyNDQsMjI3LDIxNSwxMCwxNzksMTQsMTU5LDI0NSwxOTUsMzEsMTYsMjQ4LDE0NSwxMjgsMTAwLDYsNzAsODgsOTUsMTAzLDE4NCw0LDE3NCwxMTYsNTEsMTI5LDEyMCwyMTAsMTUyLDE4NSwyNDksMjQzLDUxLDEwMCw5NCwzNiwxNTMsOTQsNjMsMTY0LDIwMywzOCwxMDUsMTM5LDIzLDIxMywzMiwxNiwyMzAsMjQsMzMsMjAzLDgyLDIwMiw3OCwyMDU=sQia49HB9T2qLPSPg3rfjo/fAivvMW5qg4MM6OvX5lCWIVGmQEiWVfyLPVwqKzrF6ZdFWJVvYd88a6LlwabUe1AD3XaFHDiz5TTrpQKl4QXWuJwP9+S1CvphOa7vutEJyT4UaPLbGhSr4JMGk5NxjA1lJJJjV83b6OtONaTHnODAdinFbwFUx/denCSqUykm1n30D5XRZVeEKrlMiWO3CAaeTj4WDcBmDnZV8bohMze97+vs=";
       
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
        expect(response.body.campos[0]).toHaveProperty("mensagem", "É obrigatório preencher pelo menos uma opção entre principal e empréstimo");
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

        //body MjEsNjIsMjMsMjgsMzUsMjI2LDIzNywxMTAsMTUzLDEyOCwxNzksNDAsNDYsMTU0LDE0OSwxNiwxMDAsMTI3LDEyLDIwOSwyMjgsMTA3LDE0MCw2OCwxNDQsMTQwLDE3MiwxNDMsMCw4Nyw0OCw3NCwyMDcsMjExLDg5LDE4LDIyOCwyMTcsNDgsMjUwLDEyMSw1LDEzMywyMTAsMjM5LDE3NywyOCwxMjIsOSwxNDIsMCwxOTksODAsMTM1LDYwLDU5LDkwLDEzNCwyNDMsMTI0LDgzLDIzOCw0MiwxNDEsNjksMjIwLDEwNyw1NSwzOSwxMTIsMjIzLDE2OSw5NywyNDYsMTc2LDUxLDY2LDMwLDEzOCw4MSwyNSwxNzQsNTYsMjEzLDI1Miw5MSwxNSwyNiwxODQsMTAxLDI0OSw4MCw1MywxMTAsNzYsMTk0LDEzLDE1NCw1OSwxNjgsMTYwLDE5NywxOTksMjMyLDk1LDE3OSwxNDksOTksMTU1LDc2LDE2OCwyMjAsMjIwLDE3NywxODIsNDAsNzYsMjMwLDQ2LDExOCwxMDAsMTQ4LDE3NywyNTMsMzAsMTU1LDE4MywxNjg=sQia4ZbdD40r7MKW2Q/G2H983TsMLByC1oeJhn/srouK35IvZ97EmItfPX4soYjmH0KRPPntG/Qcks6Zi+7bXSsEgaHMVIoSRPBj6APu8oEWpWKLDcvsCFk2gwKHe/qHH/7BZ8nYthMy07X1DHjOF+1DUs+d/sAxq1gKXaWCzp1Bf3/zqvhPKNWxfOKaX+5/WoJWHACcC+/E/YjAYP18xIVqMLy//QahA95AEHozshrHjQSuxNL+dYoVv98S/4zzl1Zlogum1XgTnVN9/NgAkuKNvbA==
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MjEsNjIsMjMsMjgsMzUsMjI2LDIzNywxMTAsMTUzLDEyOCwxNzksNDAsNDYsMTU0LDE0OSwxNiwxMDAsMTI3LDEyLDIwOSwyMjgsMTA3LDE0MCw2OCwxNDQsMTQwLDE3MiwxNDMsMCw4Nyw0OCw3NCwyMDcsMjExLDg5LDE4LDIyOCwyMTcsNDgsMjUwLDEyMSw1LDEzMywyMTAsMjM5LDE3NywyOCwxMjIsOSwxNDIsMCwxOTksODAsMTM1LDYwLDU5LDkwLDEzNCwyNDMsMTI0LDgzLDIzOCw0MiwxNDEsNjksMjIwLDEwNyw1NSwzOSwxMTIsMjIzLDE2OSw5NywyNDYsMTc2LDUxLDY2LDMwLDEzOCw4MSwyNSwxNzQsNTYsMjEzLDI1Miw5MSwxNSwyNiwxODQsMTAxLDI0OSw4MCw1MywxMTAsNzYsMTk0LDEzLDE1NCw1OSwxNjgsMTYwLDE5NywxOTksMjMyLDk1LDE3OSwxNDksOTksMTU1LDc2LDE2OCwyMjAsMjIwLDE3NywxODIsNDAsNzYsMjMwLDQ2LDExOCwxMDAsMTQ4LDE3NywyNTMsMzAsMTU1LDE4MywxNjg=sQia4ZbdD40r7MKW2Q/G2H983TsMLByC1oeJhn/srouK35IvZ97EmItfPX4soYjmH0KRPPntG/Qcks6Zi+7bXSsEgaHMVIoSRPBj6APu8oEWpWKLDcvsCFk2gwKHe/qHH/7BZ8nYthMy07X1DHjOF+1DUs+d/sAxq1gKXaWCzp1Bf3/zqvhPKNWxfOKaX+5/WoJWHACcC+/E/YjAYP18xIVqMLy//QahA95AEHozshrHjQSuxNL+dYoVv98S/4zzl1Zlogum1XgTnVN9/NgAkuKNvbA==";       
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
        

        // body {   "PessoaFisica": null,   "ContratoPlano": null,   "Banco": 341,   "Agencia": 1234,   "NumeroContaBancaria": 1234567,   "DigitoVerificadorContaBancaria": "4",   "TipoPessoa": 1,   "FormaPagamento": 1, }
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTYzLDk1LDM1LDIwOSwxMzcsMzMsMjAwLDIxNSwyMzYsMTY0LDEyNSw1LDE5NiwxNzQsMjM1LDIyMCwyMjQsODEsMzgsMjIzLDE4MiwxNjYsMTUsMzAsMTgwLDE2NiwxOTIsNzQsNTQsNjMsMjAyLDE3Nyw0NiwxODYsMjA0LDIyMiwxMjksNzMsMTQyLDE1NCwxMjIsOTQsNTEsMTAwLDcxLDQ4LDY3LDIxOSw3MiwxNzMsMTg1LDMyLDIwMiwzMSwyMzgsOTUsMTU2LDIwMywyMDYsMTQyLDQ4LDMsMTcxLDI3LDIwNiwxNDEsMTc2LDgzLDI2LDQ5LDE2NiwxNzQsMTksMzgsMjAsMTM0LDMwLDE2OCwxNTEsMjEzLDU3LDQ4LDY1LDIwLDIxMSw2OCwyMDIsMjAzLDIwOCw3LDE0LDIsMTM3LDMzLDc3LDIzNCwxNDUsMTI0LDEzNSw4NywxOTMsMTgzLDIsMjQxLDM0LDEzNywyNDcsMTM5LDcwLDE5NiwyMzUsNzgsMTI4LDksMTYzLDE2MSw2NSwzNSw0NSwxOTEsMTk1LDE3NiwyMDgsMTg4LDM5LDEzMiw5MSw4Nw==sQia4ZbdD40r7MKW2Q/G2H983Tr+Arz8uvhCBIj4DgO+58i6STn3ccqD4vm0SOivUk5e5d4LHgQkriDstJmL4YOKw4C+eVl3wgFOOkmOM8/2uoBUakAOQzk77d7c30nLjN/AYZ59OnCXiGXZphqjvHCxjdOVs2Jo6guzTszhupW38HZ2PotCqGfgdiwsRO5sW6hvItklkiLh+8mB41U0mXuiU0ODExTT5Evt02zNlHfvzjxiG28GAJe6KCdqR1BqEZ5eloJalkfjzJPDb2Rbr038xZQ==";       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1017");
        expect(response.body.campos[0]).toHaveProperty("campo", "PessoaFisica");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Pessoa Física deve possuír um identificador válido");
        expect(response.body.campos[0]).toHaveProperty("valor", "0");

    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - ID Pessoa Inexistente - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - ID Pessoa Inexistente - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {   "PessoaFisica": 9999,   "ContratoPlano": 399,   "Banco": 341,   "Agencia": 1234,   "NumeroContaBancaria": 1234567,   "DigitoVerificadorContaBancaria": "4",   "TipoPessoa": 1,   "FormaPagamento": 1, }
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTM2LDIzMSwyMyw5OSw3NywxNzcsNDYsMjEyLDI0NywxOTgsNDUsODQsMTgwLDE2MCwyMzAsMTYyLDI0OSwyMzQsNywyMjYsMjIwLDE2NCwxNjgsMTYxLDE3Myw4NywxNDMsMTE3LDU5LDE5NCwyMTIsNDIsMTgsMjQ3LDcwLDExNSw1MSwxMzIsMTc5LDE2NCwwLDU1LDI1MywxMDcsMTc2LDE4NCwxODAsMTc0LDE1Myw2LDIyNSwxNjYsMTQ2LDIyMywyMjAsMjUxLDIyMSwxODIsOTgsMTYzLDE1MCw0NywxMDMsNjYsMTI2LDY5LDI0MCwxNTEsNDUsMjUwLDE5NSw1Miw5MCwyMCwxNDQsMjAwLDE2NCw4OSwxNTQsOCwxNTMsODksMTM0LDIwNSwxNDQsMTc0LDYwLDEzMCwyMjMsMTkxLDU1LDAsMjgsNzcsMjQ2LDgzLDIyNiwxOTEsMTkwLDY4LDEyNSwyMTYsMTQsMzIsOSwzMywxMjUsMjM1LDIwNCwxNDEsOCwyNDUsMjM1LDE1MCwzMCwxNTgsNjYsNDgsMTI3LDIwNCwyMzEsMTE2LDIzMCw1OCw2LDEsMjIsMTAxsQia4ZbdD40r7MKW2Q/G2H983TlCYfIwMGoeCxolhnFqeSxeRr7Lx1jdtqXx6stTiGcUK0Sbm8r4dTp5F3x57PhBrAI9hIthJOcTRqIeXMxxNgARaOSlfY4W/WS8hC46+QgJLtmveche1IBwsbUg2jTpi+PFRcUOVP+67lGuu42LYcAKZWlr6sjBmpsi9WL/dVr8+dK8aZWEXmCzoKppzl81dTc55aZQtEswasElSqAUBix3gzfdyP2LWfGJiXLuJP7WxOWdVCBnWFwlquuupiRSGrg==";       
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
        

        // body {     "PessoaFisica": 1021,   "ContratoPlano": 999999, "Banco": 341,   "Agencia": 25,   "NumeroContaBancaria": 123456,   "DigitoVerificadorContaBancaria": "0",   "TipoPessoa": 2,   "FormaPagamento": 1,   "FormaPagamentoEmp": 1 }
        const sinqiaRequestHeader = '';

        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTU2LDI1NCw5MiwxOTQsNzEsMjU0LDI0NCw3NywyMDIsMTc4LDIyOCwxOCwxODUsODIsMjEzLDQyLDIxOSw5NSwxNzQsMjQzLDIyMSwxMjksNywxNDcsMTE3LDIxMiw2MywyNDYsMjMzLDE0NywxMzksMjAsMjQzLDcyLDM0LDQ2LDQsMTMzLDQ2LDI1MCwxNTgsMjI1LDEyMiwyNiwxMTUsMTE2LDE5NiwxNjAsMjIyLDExOCw4Myw2NiwyMDgsNzcsOTYsMTg2LDI1MSw3NywyNywyMjEsMTA4LDE5NiwzMiwyMDUsODksNiwxMiwxMzAsMzMsMTMzLDM5LDYsMTU5LDE5MCwyMjcsNzMsMjAxLDI0OCwxOTEsOTgsMjM3LDIwOSwyMTMsMTksMTkyLDE4NiwyMzYsNDIsMTMwLDE2MSw0MSw1Myw5Myw5NiwxOTAsMTcxLDIwNSwxMDksMTYxLDQ0LDU5LDIxMywxMzUsNzMsMjE3LDE0OCwyMzIsMTM1LDEwNiwzOSwyNTAsMTQyLDE3NywzLDY0LDIyMCwxMjQsNTEsMjcsMjM5LDg2LDk2LDI0OSwxNTEsMjM5LDE2MCwyNDAsNzY=sQia4j0TOGvBr4nvF9qGEO7IdwFZnh1oLUb/b5hbPy6rqsFuRaXoMVnhhgqdWDuah7p7TUdMftRElBKKeu6Yv8RhsPBufiDEW8qk3tG3YejJ4spQQiYlznnNyFLD+od7qg6FpOxUfeHnCtnwW8bqQe9u33gsbi9ikR+XcVx/OOISVHP6QaImtl0Swjf/nIHl01RP2ujea4cDgdY9018h4lu9C/KDlRrcxeOYo1g8itan0MVfqHXYwR9OBB8uKQC0Xi462ilxE3fOegDw9mjU++IdibeA5BR8neu2GUxHbVxgctRB63WXnzwFuRu1Tuag6X6MX";       
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
        expect(response.body.campos[0]).toHaveProperty("campo", "ContratoPlano");
        expect(response.body.campos[0]).toHaveProperty("valor", "999999");
    });

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta sem dígito - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta sem dígito- Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {     "PessoaFisica": 124,   "ContratoPlano": 254, "Banco": 341,   "Agencia": 1,   "NumeroContaBancaria": 1167,   "DigitoVerificadorContaBancaria": null,   "TipoPessoa": 1,   "FormaPagamento":1  }
        const sinqiaRequestHeader = '';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MjEsMjMzLDIzLDk2LDU4LDk1LDk3LDY4LDIzOCw2OCw0OSw0NiwxMzAsMTkyLDg4LDE2NiwxMzksNDMsMTg3LDUsMTkyLDE1LDQsMTUsNzcsMjUsMTY5LDU5LDk4LDMzLDM2LDI0MSwxNjQsOTgsMTMyLDE2NiwzMyw3LDE4OCwxODAsMjI4LDE3MSwxODEsNjksMTIzLDE3NSwxNzUsOTQsMjE0LDEyNCwxOTYsMjM4LDIzMiwyMDgsMTQsMzQsNjIsMTI5LDE5MSwyMzcsMTc0LDE4NSwyNTUsMjQyLDI1LDE4OSwxODQsMjIwLDI0OSwzNyw2LDE1NywxMzgsNTUsODIsNjksMTkwLDE1NCwxNSwxNDUsMTEwLDI1Miw4NiwxOCwyOCwxNzIsMTA1LDE4LDIxNSwyMDYsMjgsMjM3LDEwNSwyMjgsMTQzLDE5NCw4Myw4LDExOSwyMDQsNTYsNSwxNDksMTM1LDIxNywxMjcsMTc3LDE5OSwyMDksNDcsNTQsMTM4LDExMCwyMzMsNDYsOTksMTgzLDI0OSw2NywxMTEsMTE2LDQzLDE5MCwyMTEsMTQ3LDI0NiwxMTQsMjM4sQia4j0TOGvBr4nvF9qGEO7IdwHImdf/HyZMw1C7d/kEeNOVjmXfkA/XCKtK1elG5RkhpIw2suCMMkU+n38Z8B3NXaUWQGiQmyttcfBEGZSheWXra/CbeIT1ZTsz/5Yk/SbHfnn+iQXh8V3xhJJX6/pMaKl++cS1/u3jt5qc9BYz9G4P+9w57kCOQAj7BPVJv7C9rlXFtv7k1SqWSzpfxiXA3Yu0+QOjRmX+txJYHnsznUWeqf76Lt8BrcPEwX1RykFI6sTDOQ7umYk1skoRdHUpUmA==";
       
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

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta com dígito inválido - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração Participante Conta com dígito inválido - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {     "PessoaFisica": 124,   "ContratoPlano": 254, "Banco": 341,   "Agencia": 1,   "NumeroContaBancaria": 1167,   "DigitoVerificadorContaBancaria": null,   "TipoPessoa": 1,   "FormaPagamento":1  }
        const sinqiaRequestHeader = '';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NzEsMTY2LDIyNSwyNCwxNTEsMTkzLDg2LDIzNCwyMDgsMjM5LDY1LDQ1LDE0NywxNjIsMTUwLDkyLDIwMCw3NiwxMDcsMjA0LDIwNiwxNjYsMTc4LDgyLDc2LDE1NSwyMTYsMjIyLDIzMyw5Niw1MCwxMzIsMTE3LDgzLDE4Niw2NywxNjQsMTE0LDc0LDEyNCw2NiwxNzMsODcsMTEwLDE1Myw0NSwyMTcsMTUxLDg4LDE4OSwyNywzLDEwNywyMTcsMjE5LDE4LDExNSwyMjQsMjExLDg5LDMwLDgxLDMyLDE2MSwzNiwxMjUsMTc5LDQsMTg2LDEzNSwxMzgsNDgsMTcyLDI1MywxOTgsMjE0LDEzLDE0OSwyMzgsNzUsNDksMTIsMTIyLDMsMjI4LDIxLDE3MiwyMiw5NCwxNjUsODQsNDIsMTY1LDIwNiwxNzEsMjU0LDI1MiwyMDQsMiwxNTMsNjMsNjksMTY5LDQ0LDU5LDIzNSw3MywxMjgsNDQsNyw0OSwyMDcsMTgyLDMxLDEzOCwyMjYsMTY3LDMwLDE1NywxMDIsMTIwLDcwLDk0LDE3MiwxMCw5LDI0MCwzsQia4j0TOGvBr4nvF9qGEO7IdwHImdf/HyZMw1C7d/kEeNOVjmXfkA/XCKtK1elG5RkhpIw2suCMMkU+n38Z8B3NXaUWQGiQmyttcfBEGZSheWXra/CbeIT1ZTsz/5Yk/SbHfnn+iQXh8V3xhJJX6/pMaKl++cS1/u3jt5qc9BYz9G4P+9w57kCOQAj7BPVJv7C9rlXFtv7k1SqWSzpfxiXA3Yu0+QOjRmX+txJYHnsznUWeqf76Lt8BrcPEwX1RykFI6sTDOQ7umYk1skoRdHUpUmA==";
       
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

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com Empréstimo não habilitado - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com Empréstimo não habilitado - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {     "PessoaFisica": 124,   "ContratoPlano": 254, "TipoPessoa": 1,   "FormaPagamentoEmp": 1  }
        const sinqiaRequestHeader = '';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "ODksMTk4LDEzNSwxMjgsMTIyLDIzMywyMzUsNDgsMjMxLDM4LDQ1LDI1MiwyNTAsMjMwLDEwMCwxODQsMTk5LDE2MSwxOTQsMjEyLDIyMywxNjYsMjM0LDExNiwyMTcsMjA1LDIwMSw4NCwyNCw4NywyMzQsNDgsMTY4LDIyLDEwNywxNjksMTY0LDk0LDIwNyw2OCwxMzIsMjksMTAsODcsMjIsNzcsMTYwLDE5NCwxOTMsMTQyLDE5MCwxNTAsMjI0LDEwMCwxNDksMTAxLDIwNiwxMTQsMTk4LDgyLDIwNCw0NCwxMTcsNywxNjYsMTc5LDQ2LDIyMywxNTIsMTYyLDEyNCwyOCwxOTMsODEsMTM3LDE1NSwyNTIsNTMsMTk5LDIwNiwzOSwxNjMsMTYsMjIzLDI0NSwyNDcsNCwyMTAsMjM5LDIwMSwyMDAsMTUsODEsMTY3LDExOSwyMzIsMTQ2LDE1NywxNTUsMTMzLDIxNyw4MiwxNTksMTU1LDE3MSw5OCwxMjgsODIsNzgsNjIsMjM4LDgxLDU5LDE2LDIyOSw2OSwxODIsOTYsMjIxLDE2Myw0MCwxMjQsMTA1LDk5LDI0OCwxMDUsMTI4LDIyOA==sQia4j0TOGvBr4nvF9qGEO7IdwHImdf/HyZMw1C7d/kEeNOVjmXfkA/XCKtK1elG5RkhpiRuWEoarEF9hRrINLp5X+bc09EiOs0rCexmt6QyGCeyOdTLv0BRZ3bPHqfqvelj9";
       
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

    it("SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com todos os campos em branco - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Pessoas Físicas - Dados Bancários  - Post - Solicitação alteração com todos os campos em branco - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {     "PessoaFisica": 123,   "ContratoPlano": 254,   "Banco": 341,   "Agencia": 1,   "NumeroContaBancaria": 1167,   "DigitoVerificadorContaBancaria": null,   "TipoPessoa": 1,   "FormaPagamento":1  }
        const sinqiaRequestHeader = '';
        //RENATO JOVETTE LOPES DA SILVA
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NzMsMTg5LDI0MSwyMDEsMTM2LDE5LDE5MSwyNDAsMTEwLDIxOCwxMjEsNTcsNTMsMzUsMTg4LDIxNSwxMjEsNTcsMTEwLDQ5LDExOCwyMTMsNDAsMiw4OCwyMDIsNzMsMTEwLDE4NiwyMDEsMjMsMjAzLDEzOSwxNTQsNDgsNjMsMjAzLDE5NCwxODksMTg3LDI0MCwyMTcsNzIsMTg1LDEwMywxMDAsMjUzLDIzOSw2NSw2MSwxMzUsMjM1LDE1MCwyMzMsMTczLDE3OSwxMDYsMjM0LDI0MSwxMDMsMTY5LDE0OCwyMTgsMTU5LDI0NCwxNzgsMjIwLDIyNiwzNywxOTAsOCwxMDksMjQ4LDgyLDEwNCwxMzcsNDAsNTksMjA4LDcwLDE5MCwyMDMsODIsMzIsMTIwLDEyMSwyMzAsMTIzLDE1Nyw2LDIyNiw4MSwxODksMzksMTQwLDI0MCwyMDEsNjUsMTIzLDIxNCwyMCwxODQsMjAyLDkzLDEwLDE2MSwyMDUsMTgyLDIwMiw1MiwyLDM2LDY1LDI0OCw2NSwxMTUsMzIsMTc0LDEyNCwyNDEsMjQ4LDExNSwxNDcsMTUsMTQ0LDU3LDE5MCw2sQia4j0TOGvBr4nvF9qGEO7IdwAWepKUZlr/po08D7lQP1IkiRMLbt+Jtpd1UdlB1iEiUE7yNoKgQUiZsv7TLVs63hW6HCu0TW5cfdkNH+O//MwnechGmpdNXmiQr36W0aztF9qhSHoB5W1F65iNw/nhUk0IBXkbKeZBzvs3OFebfa3DcC3FbPuSGVZKWBmkGCAjDYKtVoqmjHTaR5lhMxz+BYDjn9b8cgpbBWmnHSQc0JwB47nROy0t7DMJAb4dxfXEtKu9Wgggxtehi8hJPqoXRXA==";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
    });

	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
