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
const entidade = entidades.find((e) => e.nome === "VALIA");
const rotaHeader = "Cadastro";
const rotaUrl = "/Cadastro/xpat";
let codigoStatusChamada;
let response;
let headers;
let descricaoTeste;
let operador;
let payload;
let corpo;

jest.setTimeout(60000);

describe("SCAF - Previdência - Cadastro - XPAT - Suite de Teste API", () => {

    it("SCAF - Previdência - Cadastro - XPAT - Post - Dados encontrados na Tabela PessoaFísica - Status code 200", async () => {
        descricaoTeste = "SCAF - Previdência - Cadastro - XPAT - Post - Dados encontrados na Tabela PessoaFísica - Status code 200";
        //Dados para o servidor de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken= "";

        //Obtem o token de autenticação para o teste.
        await obterToken(entidade.nome);
        

        // Header sem X-SINQIA-Request para POST
        let headerChamadaPost = new HeaderChamadaPost(entidade, rotaHeader);
        headers = headerChamadaPost.getHeaders();
        headers['Authorization'] = `Bearer ${global.Bearer}`;

        // Body com dados válidos encontrados na tabela PessoaFísica (JSON criptografado)
        corpo = "MTE4LDcsODIsNTEsNjUsNDMsMTUxLDE4OCwyMTQsNjYsMTksMjQ5LDE3NSwyMzgsMTk0LDM0LDk4LDE1LDEwOCwyNTEsMjI2LDE5NCw5OSwyMDgsMjAxLDcsMjcsMSwxODYsMywxNDQsMTQ0LDIzMywxNzUsMTcsMTQxLDMsNTIsMjAsMjQzLDgsMjAzLDE0MCwyNDIsMTExLDcxLDEyMywzMiw3MSwxNTEsMTg5LDExMiwxMTYsNDUsMTgwLDE5MiwxOTgsMTc5LDQ3LDE2NiwxOTQsODYsMTk2LDEwNCwyNDIsMTYzLDI4LDE2OCw4OSwyMzksNDcsMTY5LDE2NiwzOCwxOTMsNjUsMTQ0LDIsNzgsMTk0LDgwLDU1LDEyNSwyMDgsMTg3LDYwLDE3MSw4MSwxNjQsMjUyLDExMCwxMjUsMTg5LDU0LDE1Nyw4NiwxNjQsMjIwLDYwLDIzNywxMjIsMTcwLDM0LDEyMiwyMjEsMjM2LDM5LDIyOCwyMDMsMTgwLDM3LDI1NCwxMTEsMTgsMjQ2LDE1NywxNTYsMjM3LDE5MCw5NSwxMDcsMTYwLDczLDEwNyw1OSw1MSw2NSwxMjE=sQia4aHA3dSW/ODCnmqL9aPkGt01E/DZeV+cjWY71MNyEdRvCh2FtiYpLtQ7EoM/Zq/UmXCo7z+lAcMfHMgpU+l4VhAbTHPhc+qwuROWEtEmZj6UrQ/Y1juPot2EhtwfvDn/Ix/5QkjnMNB4hRUScv7LTNdqK1s3LIoJgwEEnaJv4qoKmCdbfLAaoOlu+r/0YdWe7ymBzdGXWF32iDgIqR2qGBj0GiUKrxXIbEpP/tRx98Gjmwz2/nKCYPI3ErcQOBIWI/bI7izSM1y4UQPnHAq71OCYOIBgfY6tqklj4WezDi9NLy+zGKpUFNtV4SsvJo6+Uv6yhlhoohb1l6uFQ7F6g2LdGx1sNsJPrC29Wuv6d+32ORCOyTjnU+80ZycDdMCUUnmYWWyxYRgfRsQhSipyHd/79WWNzZJCmTxrZA9aDPjz2aHuDzILld2grHo5lsNKRZW4pXfAiU0hvXXflTSYlVQC1iKcLaVLisTokIvnjyMmDp9j1VLMlzHEjhSxYvHdaU4/iQc6dgL468T3QapOz5KVhR4Tpp2saO07DnKmKkHfuJjHmOTA/fbwjTYJgdL2ZNsbYlfk/giJzqQfaMRS11G6/Y81dUmloY7DGFVj7omdRwmoNtuLuGfvFQPBv/qWq+5iPsE67Y4dsz/A9o1iMSAjOT7lGu1dzG/n+pdxPRWUGgg4H/SD1hlmXPTC7j7u7WY5vcSRUPTYPXaTtN5qeQaaD22XMKBL0rZDJUNqMVIdp+pJ8ryrDOZ+Wwl87fTKPZ+YMp01l/CUJ4tTflM+BPEI4oL15TSzjS0qsOHBsYE2Fx3XyrO6R7uQZuWLwOh7hbBmGFW97+Pm0ULZqTjb7zbQh1rwmtgpC+Ih9Ml/v3/BAgMxeub48KvfjZlXUuLrfjTmyaqQGFADkjrIcwbVGP5LkJaH2R+uJqt/Fz4mGY7590V0hPX6hkbps8HUXM4r1D10Jw67VuLyBG9LujkP9KxuE1gfF9yXn9F7f9Vnmbqd0DQoT7X3TtEAY3TLdyG9YM2bBjGnPfvJd0Je6HZApcfwxTq0SHOtCgv9ScM/B0D7ml2aMjYz7f0I1GTB+TwrN//l/Ko/FwyjYOFi5uw4ImXcURMGuYo0QpqYFCNzwPd13cNIQv9ELd0YmO4wKoCg+TDD1jSaGUzu8TVZCdg8oxT9md68EOFqqHZtptW9zdNQj9hAUO+2PVjsiW50rY76IP95hHEccuPRdpXXsCUH0iFyqa+H2SnD2bd4YMYUXCaQ8pwZMOB1d3OUtdCCGxozv6J2/JDOwqCKxW4pvGhjHZk74qTK15yTesH18pOiVNbrxtrHgq/GgXdFCK/yzRNPxVEPM8xiF7Nt+yQ79G9kaM57qlwaqwXE3yb3T024LbpJSsCAaFHVXW7JhkSwBS3lA2POdU6NCllxZyU66GEsgKps4mUg16ngOD9r4ArgFpXjUgHokMed0hhE7SZVGqZ4skb/ENUBtqlvSZIZVQNJpKpGv4C9tC2fij0E3Z7dxAccfkZXz70bSJtTQ1jMvBQ6VBA4PkIB3D2nNiYokrV3hMqO2S8R128YGy6AtoLG5b3Lyla4qMlOTDdgpbkE67r9kPboT011R0SB4HVNX1xSBJER192fJaPVUz2mKFIJstUmKsbDIoAk0lTA01XAbFuKT22Evvp35w+olcUT3ZZ1/oQeS8KLKmN/fPm4T4vP1P2s7KG+kxBlZa+YuDCPvDVmUE1IJ9NBTt5GYJT93n9jI/A==";

        //Realiza a chamada para a API
        response = await supertest(global.baseUrl)
            .post(rotaUrl)
            .set(headers)
            //.send("{\"X-SINQIA-Request\":\"" + corpo + "\"}");
            .send(corpo);

        global.apiResponse = response.body

        //Assert
        expect(response.statusCode).toBe(200);
        expect(response.body.Data).toHaveProperty("QuantidadeItensIntegradosComSucesso", 1);
        expect(response.body.Data).toHaveProperty("QuantidadeItensNaoIntegrados", 0);
        expect(response.body.Data.ItensIntegrados[0]).toHaveProperty("ImportacaoId",1);
        expect(response.body.Data.ItensIntegrados[0]).toHaveProperty("Mensagem");

    });



	afterEach(() => {
        EscreveLog.gravarLog(descricaoTeste, response, headers, payload, rotaUrl, response.request.method);
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
        descricaoTeste = "";
    });
});
