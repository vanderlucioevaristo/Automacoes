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
const rotaUrl = "/Cadastro/participante/dadosplano";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - Participante - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - Participante - PUT - Dados do Plano - Data Adesão Anterior igual a data Adesão atual - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - PUT - Dados do Plano - Data Adesão Anterior igual a data Adesão atual - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {   "DataAdesaoAtual": "2025-10-02",   "DataAdesaoAnterior": "2025-10-02",   "OpcaoIR": 2,   "DataOpcaoIR": "2025-10-02",   "AlteracaoOpcaoIR": true,   "EmRetirada": true,   "Abono": true,   "Justificativa": "justificativa alteração" }
        //ContratoParticipante: 37201
        const sinqiaRequestHeader = 'NjQsMTgxLDE0OCwzOSw5Myw2MCwyOSw5LDI0Niw3Myw1MCwxMzUsNTAsMjMxLDUzLDg3LDE2LDI0MywxMjMsOTYsMTc5LDEwNSwyMTksNzQsMTYsMSw1NCwxNjYsMjAwLDU5LDE0OCwxMzEsOTksNDEsMTAwLDExNSwzNSwxMzcsMTY0LDM5LDcsMjAzLDI0NiwxNDQsNiw2Niw0MSwyMjIsODAsNzQsNjQsMjI0LDI0LDI0LDEzOSwxMiw5MCwxMjgsMjksMTk2LDEyOCwxODgsMjAxLDIyMCwyNTQsMTMzLDE4NSwxMTAsMjUyLDE0Niw3NCwxODIsMiwxNTMsMjA4LDI0MCwyMTIsMTA4LDEyNiwyNTEsMjIwLDE0NSwxMDgsNjksMTI5LDQyLDU5LDE5LDk2LDE0OCwxNzIsMTgyLDExNCwxNzAsMTA1LDE1LDE4NywxNDMsMTQyLDU0LDE3NCwxMDgsMjEyLDIzNyw4NCwyMzYsMTM3LDE5MSwyMzksMTAyLDEzNiw0OCwxNDQsMTk2LDUzLDI2LDIxNywxMzgsNjAsMTE3LDE0NSwzMywxOTQsNDksMTgzLDE5NCwzOSw3Nw==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "NjcsMTQyLDE4NiwyMDgsOSwxOTAsNjUsODksNyw3MCwxNjEsMjIxLDMxLDczLDEyMywyLDI1Miw5MCw1LDI1MiwyMzQsMTIsMTc1LDM4LDI0OCwyNSwxOTUsMTg1LDE2MywzMSwxMDcsNDIsMTUxLDE0MiwyNDUsMTAsMTUwLDI0MiwxMjAsMjIzLDIzMCwyMjcsNjAsMTcyLDIxMywyMTUsMjAxLDI1NSw1NSwxMjgsMTA5LDEzMiwxMTEsMTAzLDcsMjEsMjUwLDc1LDEyMSwxODcsMTkxLDYzLDEzOCwyMzUsMTc4LDY3LDIzNSwxMTQsOTQsNjYsMTMzLDIxMSwxNzAsMTUwLDIzLDQwLDQ2LDE1LDE2MCwyMzcsMjQ3LDIwNywxMTksMTI5LDIxMywyNDUsMjMwLDE2NiwyMiwyNTUsMTExLDg2LDQ0LDIxNiwxMjEsMTI3LDE3MywyMTksNDcsMjI1LDE3MCwyMDIsODQsMjE0LDE2LDE0NCw4MCw0NCwxODgsOTUsMjA3LDIxNiw0NCwxOTUsMCwxODEsMTUwLDQsMjAsMTE5LDExMiwxNjgsMTM3LDYyLDIyOSwxNyw0NCwxOTg=sQia4X2WwCcC/XhowV+ukWIg95NyAPb3Lnp3By8hEYBvhkM78CTFyoAoDZovzqR2YHlH9gKMJost0LMwwKd36B7QQEZ4fV2p3IUTinfNfLDjU5lY+nPdB2dW07UUSfO7ohf+0fh+Ne1t3fhmGEtzP0gHfUJaBorBiZS2VnXFAfFfbczm/mIJln/Voqei0JJSbOgh+p1Qgb83EpqiOaHeXlHnybtJzeizwr9kJea5C8xygWJBYaGUwtBzgaDN+9Cshnk6y0tWWm7pKx6XoUbbRhnsCtb3UeHRuzUZ+T+VPcnLzydkwAA3tc6rBrP8g1aF2m//H";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1545");
        expect(response.body.campos[0]).toHaveProperty("campo", "DataAdesaoAnterior");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Data de adesão anterior deve ser menor que a data de adesão atual");
    });

    it("SCAF - Previdência - Cadastro - Participante - PUT - Dados do Plano - Não pode mudar regime tributário - Status code 400", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - PUT - Dados do Plano - Não pode mudar regime tributário - Status code 400";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {   "DataAdesaoAtual": "2025-10-02",   "DataAdesaoAnterior": "2024-10-02",   "OpcaoIR": 2,   "DataOpcaoIR": "2025-10-02",   "AlteracaoOpcaoIR": true,   "EmRetirada": true,   "Abono": true,   "Justificativa": "justificativa alteração" }
        //ContratoParticipante: 37201
        const sinqiaRequestHeader = 'MTA0LDE2NywyOSwxMDAsMTEyLDE1MSwxMzEsMjIwLDI1MCw3LDE5NSwxOTcsMTE5LDE1NiwxMzMsMTQzLDE5NiwyNTIsNSwyMTgsNDIsNCw5OSwxODcsOTksOCwxMjAsMTY4LDQ5LDE2MiwyLDIyOCwxMTksMjAxLDcsNDUsMTY5LDU5LDE3NCwyOSwyOSwyNDIsODgsMTk0LDc3LDE5NiwzLDE4MSwxNDcsMTQ3LDE5NCw1NCwxMDQsMTA3LDExNSwxMTgsMjQ1LDE5NywyMDAsNjIsMTIyLDk2LDkxLDE3MCwyMzIsMTAyLDIyMCwyNDcsMjI1LDQyLDE0MCw5LDExNSwyMDEsOTYsMTIwLDIxNiwxMTAsMjU0LDI1MywyMTcsNyw3OSwxMDYsMjEyLDcyLDg5LDExNyw1OCwxNTMsNzksMTE3LDE0NCwyMjEsNDcsNTgsMjI0LDEwOCw2NSwxNDcsMTE0LDk0LDE2NCwxNzgsMjQsMTIxLDIyLDgzLDk4LDc4LDEyNSwxMDksMTg0LDEyOSw5NCw3Miw1Myw4NywxMzUsMTU1LDE3MiwxMTYsMTU2LDE5MCwxOTYsMzIsMjQyLDU=';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "ODMsNTEsMTMwLDE5MSwxMjUsMjExLDE3OSwyMDYsNjUsMjA2LDM2LDE0MCw3MywxMjMsMTYzLDE2MywyNTQsOTksMCw4MSw0NSwzMSwyMzMsOTQsMTY1LDEwNiw2MiwxODUsMjQ2LDE4Nyw2OSwyMjgsNTAsNzUsMTI2LDEyMSwyNywyMTUsMTI2LDEsMzksNTEsNTYsMTcxLDE2NSwxOTQsNzAsNTIsMjM2LDEwNSwxMTksMTI2LDE2NiwyMjQsMTMsNSwxMDMsNDcsMjQyLDE0NCwxNTgsMTUwLDE0Myw4MSw1NSwyMzgsMjI4LDExOCwxMjksMjA5LDEwOCwyNTIsNDksMSw1Myw4MCwxNzUsMTkyLDEzMSwyNTAsMTE1LDIyMCwxODMsMTIsMTEwLDE2MCwxMDQsNjgsODgsNzYsMjIsNjcsMzUsMjMwLDIzOSwyMzIsMzYsMTc2LDEwOCwxOTksMTQ2LDYzLDE2OCwyMDgsMTgxLDIxMiwzNiwxMDcsMjUyLDEzMywxMTUsMTE0LDczLDE2Myw1OCwxMDYsMTk0LDE5MSwxOTcsNzIsMjAxLDI0OCwxNjMsOTksMjYsMTAsOTgsMTgwsQia4X2WwCcC/XhowV+ukWIg95NyAPb3Lnp3By8hEYBvhkM78CTFyoAoDZovzqR2YHlH9gKMJost0LMwwKd36B7QQEUtnMzFM3euCh1G1SSPDZmfV5mH4rI4M6O2F/oDXH93wUkyNf+UTjaOlFQc2CcomosF3NPT6JbRKwqLyfdm3txEvdAYQIMvptbb70caMXYezXdEAx68A2BYKSPXkDyPa6Zp2DkqRfvUJNQTAaasyIcK7jGi+n9Px6OXJrSQYVhrZ9NWP4KL14CCEBlA6CF/tjXeglHUaF5Y8ev8JCX7DPfyYwkRAi3eFmiTLQat99q7t";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1046");
        expect(response.body.campos[0]).toHaveProperty("campo", "OpcaoIR");
        expect(response.body.campos[0]).toHaveProperty("mensagem", "Participante não pode realizar a mudança do regime tributário");
        expect(response.body.campos[0]).toHaveProperty("valor", null);
    });

    it("SCAF - Previdência - Cadastro - Participante - PUT - Dados do Plano - Sucesso - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - Participante - PUT - Dados do Plano - Sucesso - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // body {   "DataAdesaoAtual": "2025-10-02",   "DataAdesaoAnterior": "2024-10-02",   "OpcaoIR": 2,   "DataOpcaoIR": "2025-10-02",   "AlteracaoOpcaoIR": true,   "EmRetirada": true,   "Abono": true,   "Justificativa": "justificativa alteração" }
        //ContratoParticipante: 37201
        const sinqiaRequestHeader = 'MTYxLDgxLDIxMSwxNTksMjQzLDMzLDIwOCwyMSw2NSwyMDEsMTQzLDIzMCwxMzgsNDksNjUsMTUyLDg4LDc1LDkwLDM3LDE1NywxOCwxOTMsMTQzLDEzLDIzLDIyMSwxOTMsMTMwLDE0NSwxMDgsNDIsODgsODMsMTkzLDExMCwwLDI1MCw5NiwxNjUsNzcsNjMsMTMyLDE2Miw0LDEyMSwxOTYsMTQyLDExMiwxMzQsMTI4LDExMCwxNjQsMTc2LDUzLDcwLDE0MiwxNDQsMjE2LDU4LDI1MSwxMzEsNjcsMTMwLDEwMSwxMjksMTQ1LDEyOSwyNTQsMTQxLDk2LDIwOCwyNiwyNDMsMTI0LDE0MiwyMjAsNjYsMTQ1LDE5MiwxNjIsMzEsMjQxLDEwLDEwNiwxOTksMjIyLDkxLDU0LDQ4LDE3MCwyMzYsMTU3LDE1NCwxOTEsMzUsMTY4LDIyMywxODAsNTUsMTEsMjM3LDYxLDE3OCw0NCw1MSwxNzgsMTI5LDE5OCwxNTcsMTc1LDE5OSwyMDQsMjUxLDI0NSwxMjMsOTAsMTI2LDE3MSwxODYsNDQsMjA1LDI1Myw5NywxMTEsNDAsMTc5LDIwMg==';
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader, sinqiaRequestHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTI5LDg4LDEzOCwyMTIsMTk0LDE5NSwxMzIsMTc5LDIxNiwxMjIsMjEyLDIwMiw0Myw2Miw3MCw3MywyMjUsMTMwLDYzLDExMiwyLDEwNiwyMywxMzAsMTI5LDczLDQ5LDIyNCwyMCwyNDIsMTM3LDc4LDE2NCwxMywxNTgsNDUsMTI5LDIwMywxOTgsMjE3LDkyLDUyLDU1LDIwOCwyMCwxMTgsNjEsMjI1LDE0NywxODEsMTMxLDE0OCwxMTQsMSwxOTQsNDQsMTY4LDEwMCwxNDUsNzcsOTYsMTIzLDIzMywxNTYsMTc0LDIwNywyNDAsMTczLDIyMCw2NSwxMjMsNDksMTQ1LDEyNSwyNDYsMjM3LDE3MCwxMjQsMjMzLDQ3LDE3LDEzOSwyMzAsMjA2LDE5OSwxMDYsNTgsMTQsODksMTIzLDExNywyMzgsNjQsMTQyLDE5OCwyMTIsMTk5LDY4LDI0NywxMzUsMTkwLDk5LDE0NCwxNjAsMjM3LDI1MiwxMCw0NCwyNSw3MSwzOSwxNzYsMTQ4LDk4LDE4Myw4MCw1MCwxMjEsMTA0LDk3LDEwNyw4NSwxMywxNjEsMTkyLDIwNiwyMTAsMTU0sQia4X2WwCcC/XhowV+ukWIg95NyAPb3Lnp3By8hEYBvhkM78CTFyoAoDZovzqR2YHlH9gKMJost0LMwwKd36B7QQEcFuPwNDCRO3APFSIFCNf8Shf7kk4V3x9zyxBKFbV1A2L7+US2hEAkaqQrVWwmEA+OEdn4azV9Re6JcbXBcGzjqx246XugNzim29NAW4MkSrFBI3Gf4njO8etOAVHk3gumDJ+dG6o/JRtAVgy2KUOEk=";
       
        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .put(rotaUrl)
            .set(headers)
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
        expect(response.body).toHaveProperty("ProcessoDescricao", "ALTERACAO_DADOS_PLANO");
        expect(response.body).toHaveProperty("SituacaoDescricao", "Aguardando Autorização");
    });


	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
        
    });
});