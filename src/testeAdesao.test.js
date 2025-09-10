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
const rotaHeader = "Adesao";

jest.setTimeout(60000);

describe('Suite de Teste API - Adesao - Contribuição Pré Adesão ', () => {
    const rotaUrl = "/Adesao/contribuicaopreadesao";
    
	it('Adesão - Get/Adesao/contribuicaopreadesao - Todos os parâmetros corretos - Status Code 200', async () => {
        //Dados do mock no ambiente de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken = "Sq5fGOi9PFipxfPdKfX-iU6JbttXvcrX0p1IrIpAiekzHthpRDby2KjrfYzCDL0FQAPuvQK71gTfvozAOWspeeaxsvWuI4_Uxwsf7sTAsyqdDOEBLZBmet1z_uTCkUvc-85HN-IsAj8H6Vp95sAdQEMDPA-jewOEhqtP6iDB_diRTpSDcO1Cb082Wa43anwsyuY-Q6qQqMgKpWESIy5d07KmqkiUMaw69IBvJYScDYV1D8C3b4nEZh9vOQVXBI8AkJRfbsAF1szsQXRhik-TnBi_jdd42txUpclJPl_6hcG2vvGppkujbkNVYAkWT5kJKwH33UhJqW2LsBqIvpshmAIrOqA6rYjGn4y1bK5S6BM";
        
		// Obtém o token Bearer antes do teste
		await obterToken('VISAOPREV');

        //Período enviado na consulta 13771/2024-01-01/2025-01-01
        const sinqiaRequestHeader = 'MTI5LDY2LDY3LDY2LDE2NCw1OSwxODgsMTY4LDUxLDE1LDgsMjIxLDcyLDE1OSwxNzksMTMzLDYyLDE5MCw2LDE3Nyw2MSwyLDE5NSwxMDcsMTQxLDgyLDcsMjQ5LDIzNSwxMSwyMzYsMjE3LDEyNiw5LDIyOSw1NSwxOTIsMjIxLDUxLDE2Niw1Miw1NywzMiw1NSwxMTQsMTI0LDc5LDIzMywyNSwzLDE3MSwxMDQsMzcsMTExLDU3LDE5OSw2OSwxNDQsMjAxLDQ2LDI0NiwyNCwyMDksMTU1LDE5MSw4NywzNCwyMTEsMTEsMTcwLDE0OCwxOTYsMTM1LDkzLDIzNSw4NSwxNDIsMjIsMTI3LDIxMiwxODEsMTAxLDIwNSw2LDI1LDU3LDIwLDIwMiwxODYsMjEsMTU1LDg4LDUzLDgwLDIzLDkyLDE3NSwxNjksODgsMTEwLDIzMiwyMTgsMTE1LDE0MywxMTYsNzMsMjQ1LDE3NywxNzUsODEsMjUyLDExMiw4Nyw4NSw2NSwzNCwyNDksMjA5LDEzNiwxNDgsOTYsMTY2LDEyMSwyOCw0NiwzNSwxNDQsNDk=';
		let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        const headers = headerChamada.getHeaders();
		headers['Authorization'] = `Bearer ${global.Bearer}`;

		// Realiza a chamada GET para a API
		const response = await supertest(global.baseUrl)
			.get(rotaUrl)
			.set(headers);

		global.apiResponse = response.body;

        //Realiza a chamada no ambiente de virtualização
        headers['Authorization'] = `Bearer ${virtualToken}`;;
        const virtualResponse = await supertest(virtualServer)
        .get(rotaUrl)
        .set(headers);

        global.virtualResponse = virtualResponse.body;

		// Se ocorrer erro, grava o payload no log
        if (response.status == 200) {
            console.log(global.apiResponse);
            const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, global.apiResponse,null);
            console.log(payload.toString());
            // Grava o payload no arquivo de log de execução
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, "0");
            const logName = `Todos os parâmetros corretos - Status Code 200_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
            const logPath = path.join(__dirname, "../logsexecucao", logName);
            fs.writeFileSync(logPath, payload.toString());   
        } 

		// Asserts para validar o resultado na API
        expect(response.status).toBe(200); // Espera status 200
        expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array
        expect(response.body.Data[0]).toHaveProperty("FuncionarioPreAdesaoID");
        expect(response.body.Data[0]).toHaveProperty("TipoContribuicaoID"); 
        expect(response.body.Data[0]).toHaveProperty("ContribuicaoCampanhaPreAdesaoID");
        expect(response.body.Data[0]).toHaveProperty("Valor");
        expect(response.body.Data[0]).toHaveProperty("FaixaContribuicao");
        expect(response.body.Data[0]).toHaveProperty("DataAtualizacao");
        expect(response.body.Data[0]).toHaveProperty("DescricaoPeriodicidade");

        // Assert para comparar as respostas da API e do ambiente de virtualização
        expect(global.apiResponse).toEqual(global.virtualResponse);

    });
	
	it('Adesão - Get/Adesao/contribuicaopreadesao - Período de data maior que um ano - Status Code 400', async () => {
        //Dados do mock no ambiente de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken = "oa-7G7wa2qwah87AFtAbxBWq9alDZKvcmbK9qwS0WAaKMWmktUKD8htyhNDHpwTPSAG2DAI5JhbINwDh5MOpYf_gXR18-c1TUPpt6f2MdUtQesKugRUN6jzTxsbkTEgePY6baphjh634rt1QLWVlAro_Qwa3y7beqfpkapUZGVyIWzE0iyG1qqMKLo9r7LsdZy3jGQQcH1U-biQqQYfgt9Bm_XIb3iVXR1Dkcp60J8NFtnpWs8TCYygHCI2nQYqsVSbVOfMCzpZoQg4DmUgHThWZuPeHl6E36Rh1cs7ma92FCfXX9Vz5rXxCzZWzwKWlyKVw4XvK-24r7L8Skfm9abHtB5yEBEH8JxmHIwe0j4Q";
        
		// Obtém o token Bearer antes do teste
		await obterToken('VISAOPREV');

        //Período enviado na consulta 13771/2024-01-01/2025-08-01
        const sinqiaRequestHeader = 'MTM2LDExNCwxMjUsMTg4LDUzLDE5NCwxMTEsMTkwLDEwMywyMDcsNDUsMTIsMjIwLDE4OCw2NCwyNiw1NywxMDAsNjEsMjM1LDE4MywxMTksMTk5LDE0NCwxMDEsMTIyLDUwLDQ0LDEyNywxMzcsMzMsMzAsMTQ3LDU0LDE1NiwxMzQsMTcyLDM3LDg2LDE4MSw3MiwyMDQsMTgwLDE4NywxOTQsODcsNTAsMjEwLDQ3LDExNyw2OCwxMDUsNDIsMjI4LDM5LDUxLDE0NiwyMDYsOTYsMTY1LDEzMyw5LDE0NCw2MiwxNjYsMjAxLDI0MSw1MSwzMyw5NiwyMDksMTQxLDc0LDIzNCwxNTEsMzYsMjMsMjMsODIsMjQ0LDE1OCw1MCw2OCwyMTUsMCwxMSwyNDYsMjQxLDU4LDIwLDYsMTg5LDE4OCwyMDAsMjYsNTUsMTQ0LDE5Miw5LDIxOCwxMTMsNDQsMTYxLDY3LDE2MywyNDksMTQ3LDY1LDEwNCwyMjYsMjEsMjI4LDIyMSwzMiwxMTgsMywyMjYsMjAzLDI0OSwxLDQ4LDEwLDE3NywyNTQsMjMwLDcsMTU3LDE5OQ==';
		let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        const headers = headerChamada.getHeaders();
		headers['Authorization'] = `Bearer ${global.Bearer}`;

		// Realiza a chamada GET para a API
		const response = await supertest(global.baseUrl)
			.get(rotaUrl)
			.set(headers);

		global.apiResponse = response.body;

        //Realiza a chamada no ambiente de virtualização
        headers['Authorization'] = `Bearer ${virtualToken}`;
        const virtualResponse = await supertest(virtualServer)
        .get(rotaUrl)
        .set(headers);

        global.virtualResponse = virtualResponse.body; 

		// Se ocorrer erro, grava o payload no log
        if (response.status == 400) {
            const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, global.apiResponse,null);
            console.log(payload.toString());
            // Grava o payload no arquivo de log de execução
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, "0");
            const logName = `Período de data maior que um ano - Status Code 400_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
            const logPath = path.join(__dirname, "../logsexecucao", logName);
            fs.writeFileSync(logPath, payload.toString());   
        } 

		// Asserts para validar o resultado na API
        expect(response.status).toBe(400); // Espera status 200

        // Assert para comparar as respostas da API e do ambiente de virtualização
        console.log(global.apiResponse);
        console.log(global.virtualResponse);
        expect(global.apiResponse.campos[0].codigo_erro).toEqual(global.virtualResponse.campos[0].codigo_erro);

	});

	it('Adesão - Get/Adesao/contribuicaopreadesao - funcionarioPreAdesaoID inexistente - Status Code 200', async () => {
        //Dados do mock no ambiente de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken = "DkOfFPsgAoM1RwO-XhP1N2SYO97n2J5m9crQpBCYWeCHmi1j1k7ruRs_DHyYfsrjbGI8tbbJR8fpbl83Gc3NR25_rj3fuY2GVu2FOxqXuaRxmRAV8ZcSlgcJPDs85CVLAxpk538HiiOm331Qr55thT43_srmtHcHlrx-FakxQ8RwpE7Kpa5LYvnj3b64HSfUtBJPeVDHE9_dGvX_TLRJwT8VaIw_cfZY7hL0SCw9QJgaRyocbtSpU_T0JlHjwBL1yW0y_Cq_QeLTr4YOrtTIwGnY2pRC3EWL1JVtHVOzHM3oU67zavWgsifs6nHJ4mLTeP_kNAncOMLPMBBm_dChLzSdgZEb-q0h20W7i7vdLxY";
        
		// Obtém o token Bearer antes do teste
		await obterToken('VISAOPREV');

        //Período enviado na consulta 11111/2024-01-01/2025-01-01
        const sinqiaRequestHeader = 'MTQ5LDM2LDczLDE2NywxNTcsMTA5LDE1OSwxOTYsMTY0LDE0MCwyOCwxMDksNzEsODksMTYwLDIxOSwxMTYsMTczLDk2LDE0OSw5NywxMTAsMTQ1LDEwNiwxMjAsMTY4LDEyNCw0OSw2NiwxNDUsNTEsMjAsMTE5LDE5NCwyMjcsMTU3LDgyLDUsMTQzLDE3NSwxNzcsMjgsNjcsMjE4LDM2LDEyLDE5OCwxNDUsMjMzLDE5OCwxMzMsMjQ3LDQsNTMsMTg5LDE2Nyw4OCwxNzcsMjIyLDE0LDQzLDI0MiwzNSwzMiwxNjQsMjIsMTczLDk5LDEwNSw1OSwyMCwxMDgsMTE2LDEzMiwyNiwyMjEsODAsMTgzLDI4LDY3LDgyLDEyMSwyNTAsMjA4LDI0Nyw3MSwxMywyMjgsMTUzLDkzLDExNSwxMSw4NCwyMDksNTMsMTUsNzEsMTI3LDIsMTkwLDc5LDE1MCwxOTYsMjI1LDEwMiwxNDAsMTU2LDE3OCwyMDIsMjUzLDc0LDE1NywyMjIsMTQxLDI0OSwyLDE3NywyMjEsMTgsMTcyLDI0MiwyMDEsMjUxLDUwLDE2MSw0NSw3NCwxODk=';
		let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        const headers = headerChamada.getHeaders();
		headers['Authorization'] = `Bearer ${global.Bearer}`;

		// Realiza a chamada GET para a API
		const response = await supertest(global.baseUrl)
			.get(rotaUrl)
			.set(headers);

		global.apiResponse = response.body;

        //Realiza a chamada no ambiente de virtualização
        headers['Authorization'] = `Bearer ${virtualToken}`;;
        const virtualResponse = await supertest(virtualServer)
        .get(rotaUrl)
        .set(headers);

        global.virtualResponse = virtualResponse.body;

		// Se ocorrer erro, grava o payload no log
        if (response.status == 200) {
            const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, global.apiResponse,null);
            console.log(payload.toString());
            // Grava o payload no arquivo de log de execução
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, "0");
            const logName = `funcionarioPreAdesaoID inexistente - Status Code 200_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
            const logPath = path.join(__dirname, "../logsexecucao", logName);
            fs.writeFileSync(logPath, payload.toString());   
        } 

		// Asserts para validar o resultado na API
        expect(response.status).toBe(200); // Espera status 200
        expect(Array.isArray(response.body.Data)).toBe(true); // campos deve ser array

        // Assert para comparar as respostas da API e do ambiente de virtualização
        expect(global.apiResponse).toEqual(global.virtualResponse);

	});

	it('Adesão - Get/Adesao/Contribuicaopreadesao - Datas em formato yy-mm-dd - Status Code 400', async () => {
        //Dados do mock no ambiente de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken = "XNGPTJIeZoNydYEJVm4sMux38G7T3TX2BnAnw66GPQGTYZZUE7jPnn_OlKHsb52_iE5xZURZKmJKBT4pAcExgajE3YZualPn7xOVZR4mBNefzccBN1PBDflfHzF2ooWptqGY3DGlxIsbwzhyKAHr6upS-eizsWpbvayy4naOV4ld373eWK_-LIq0I4r-Y1zH9CXtR5qP2DUz4kcF51HfP8pOiMubrep1fsIuVvV-m7gnDn-b19oT5yVuMOqgavfd6lmYyAv-_CCu3QocIsKmTxZ8f0NzsFBfLGqpzBbP6kUDt2SF7w3HnwD51MxG8VO-2gB4wrJJiJ-5MVE1IIawxorMM0VoDs7236atO44I7KU";
        
		// Obtém o token Bearer antes do teste
		await obterToken('VISAOPREV');

        //Período enviado na consulta 13771/24-01-01/25-01-01
        const sinqiaRequestHeader = 'NDcsMjIyLDE0NSwyMTksMjM1LDE0NSwyNDUsMTQ3LDE5OSwxNDAsMjI2LDEwNyw5MCwyMjYsMjE5LDE2NywxNzIsMjI4LDUxLDI0NiwxNywxNzYsMTY3LDc4LDMzLDU1LDIwMSwxNjgsOTUsMTQ4LDExOCwxLDMxLDE0NCwxOTcsMTQ2LDY2LDI0MiwxNzIsMTk3LDIyMSwxMjIsMTcsMTI0LDkxLDg4LDksNzksMTAzLDEwMSwxMTEsMzQsNDksNjgsNDYsMjM4LDUwLDYzLDI0Miw2MiwxNjgsMTcyLDQzLDIxMiwxNjMsMjM0LDYyLDE4MywxODIsOTcsMTk1LDE3MCwxMCwyOSw2MCw5OSwyMTAsMjIxLDEsMTc2LDM5LDI1NCw1MCwxODUsMTE4LDI0MywxOTIsMzgsMTQ4LDI2LDEwOCwxMzQsNDcsMTEzLDE0NSwxNjUsMCwyMzcsMTYsMjAxLDIwOSwyNDMsMTIwLDE2MywzNiwzOCwxNTYsOSwxMzIsNiwxNTksMjIyLDIyMywxMDksODQsMTM2LDEzMywxMDYsMTIwLDQsNzEsMjU1LDIwLDI0OSwyNTMsMzIsMjIsMzU=';
		let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        const headers = headerChamada.getHeaders();
		headers['Authorization'] = `Bearer ${global.Bearer}`;

		// Realiza a chamada GET para a API
		const response = await supertest(global.baseUrl)
			.get(rotaUrl)
			.set(headers);

		global.apiResponse = response.body;

        //Realiza a chamada no ambiente de virtualização
        headers['Authorization'] = `Bearer ${virtualToken}`;
        const virtualResponse = await supertest(virtualServer)
        .get(rotaUrl)
        .set(headers);

        global.virtualResponse = virtualResponse.body; 

		// Se ocorrer erro, grava o payload no log
        if (response.status == 400) {
            const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, global.apiResponse,null);
            console.log(payload.toString());
            // Grava o payload no arquivo de log de execução
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, "0");
            const logName = `Datas em formato yy-mm-dd - Status Code 400_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
            const logPath = path.join(__dirname, "../logsexecucao", logName);
            fs.writeFileSync(logPath, payload.toString());   
        } 

		// Asserts para validar o resultado na API
        expect(response.status).toBe(400); // Espera status 200

        // Assert para comparar as respostas da API e do ambiente de virtualização
        console.log(global.apiResponse);
        console.log(global.virtualResponse);
        expect(global.apiResponse).toEqual(global.virtualResponse);
	});

	it('Adesão - Get/Adesao/contribuicaopreadesao Intervalo de datas invertido - dataAtualizacaoInicial > dataAtualizacaoFinal - Status Code 400', async () => {
		// TODO: Montar params com datas invertidas
		// Espera status 400 ou mensagem de erro        //Dados do mock no ambiente de virtualização
        const virtualServer = "https://api-sv.primecontrol.com.br/MzM1OGVjYjhjMWUwNDRiMDgzYjhlNzljZGM2NTE3OGQ";
        const virtualToken = "PVpl8EK8oBa6FyLbMP5uVRILnvmhzQVEYm2jgxnNsQelp6jjuHF70VjSplk_v7FGROjYSXdTNqCBnIxuveEYUdZH4Dts3-hYYKw-2APpTiZkcLGlzXaLru-Ae3EjsSpFh--HFV7yKiM4PItdPj0-Zic-g-J9yWRKTa8ZC2N7UdTF1gjSQ8z9F6nCKgXJggEB9CZkzMOdhNnS5h6GGLO5Nuerb_daiPdO84JRyoA4ZMKkADo7iDdV1wUd6WkNb_hSC9PbnlGkDRvKzUH0e-fI4R0Pqwv8djflqIbo8DOfRplLtRK7sMUZtbWBB631GX-fz-LfG0a_Soh87jj900TDjHhjBeBCg9ZwKbwnNlmkYOQ";
        
		// Obtém o token Bearer antes do teste
		await obterToken('VISAOPREV');

        //Período enviado na consulta 13771/2025-01-01/2024-01-01
        const sinqiaRequestHeader = 'NTksMTEsMSw4MCwzNiwxNTgsMjAxLDE0MSwxMTksMjEyLDIxMSw5MSwxMzcsODcsMzUsMTQzLDY4LDIzLDE3NywyMTMsMTMxLDQ5LDE0NywyMTAsMTQ5LDE5NCwyMTMsMTI0LDIxNywxNzEsMTExLDE4NywyNDcsMjExLDIzMywxNzUsODIsMTIwLDk3LDkyLDM0LDEwMCwxNTIsMTM4LDEwMywyNywxOTksMTk3LDIxMyw3MiwxNzIsMTIsODMsNDYsMjI5LDEzMCwyNDUsMTcsMTExLDIzNSwxMTgsMjQxLDIzOSwyMTcsMjEyLDE4MCwyMjIsMTM2LDE0OCwxMDAsMjM1LDE2MSwyMzQsMTY4LDkxLDE2MiwxODMsNjQsOTYsMjQ4LDIzOSwxOTgsMjksOTYsMTY0LDE5NiwzOCwyMzgsNTgsMTM4LDcsMjM1LDQwLDE5NywyMDQsMzksNTUsMTcsMjI4LDIwMSwyNiwyNSwxNjgsMjEyLDQxLDI0OSw5LDU4LDE4OCwyNDQsMTc0LDEsMjE5LDEwNSwxODgsMTU5LDU1LDU3LDY2LDIyNiwyNDEsOTcsMTc3LDEwMSwxNTEsMTEyLDY4LDIwMQ==';
		let headerChamada = new HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader);
        const headers = headerChamada.getHeaders();
		headers['Authorization'] = `Bearer ${global.Bearer}`;

		// Realiza a chamada GET para a API
		const response = await supertest(global.baseUrl)
			.get(rotaUrl)
			.set(headers);

		global.apiResponse = response.body;

        //Realiza a chamada no ambiente de virtualização
        headers['Authorization'] = `Bearer ${virtualToken}`;
        const virtualResponse = await supertest(virtualServer)
        .get(rotaUrl)
        .set(headers);

        global.virtualResponse = virtualResponse.body; 

		// Se ocorrer erro, grava o payload no log
        if (response.status == 400) {
            const payload = new PayloadChamada("GET", global.baseUrl + rotaUrl, headers, global.apiResponse,null);
            console.log(payload.toString());
            // Grava o payload no arquivo de log de execução
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, "0");
            const logName = `Intervalo de datas invertidoStatus Code 400_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
            const logPath = path.join(__dirname, "../logsexecucao", logName);
            fs.writeFileSync(logPath, payload.toString());   
        } 

		// Asserts para validar o resultado na API
        expect(response.status).toBe(400); // Espera status 400

        // Assert para comparar as respostas da API e do ambiente de virtualização
        console.log(global.apiResponse);
        console.log(global.virtualResponse);
        expect(global.apiResponse.campos[0].codigo_erro).toEqual(global.virtualResponse.campos[0].codigo_erro);

	});

	afterEach(() => {
        global.apiResponse = null;
        global.virtualResponse = null;
        global.Bearer = "";
    });
});
