# SCAF Previdência API Test Automation

## Architecture Overview

This is a Jest-based API testing framework for SCAF Previdência endpoints with automated BDD documentation and CSV test case generation.

### Key Components

- **src/**: Test files and utilities
- **globals/**: Core API infrastructure classes  
- **bdd/**: Auto-generated BDD feature files and CSV test cases
- **logsexecucao/**: Runtime execution logs

## Testing Patterns

### Test File Structure
All test files follow the pattern `teste[ModuleName].test.js` and use this structure:

```javascript
// Required imports
const entidades = require("./globals/entidades");
const HeaderChamada = require("./globals/headerChamada"); // GET requests
const HeaderChamadaPost = require("./globals/headerChamadaPost"); // POST requests  
const obterToken = require("./obterToken");
const EscreveLog = require('./globals/escreveLog');

// Entity selection and constants
const entidade = entidades.find((e) => e.nome === "VALIA");
const rotaHeader = "Cadastro";
const rotaUrl = "/Cadastro/endpoint";

// Standard test variables
let response, headers, descricaoTeste, params;
```

### Authentication Flow
1. Call `await obterToken(entidade.nome)` to get Bearer token
2. Token is stored in `global.Bearer` for subsequent requests
3. Always add `headers['Authorization'] = \`Bearer ${global.Bearer}\``

### Create Body
```javascript
const body = JSON.stringify({
    "field1": "value1",
    "field2": "value2",
    "field3": "value3"
});
```

### Encrypt body and querystring

await criptografaDados('Vander', '', body, entidade.publicKey);
const sinqiaRequestHeader = global.queryStringCripto;
corpo = global.bodyStringCripto;

### Header Management
- **GET requests**: Use `HeaderChamada(entidade, rotaHeader, sinqiaRequestHeader)`
- **POST requests**: Use `HeaderChamadaPost(entidade, rotaHeader)` (no X-SINQIA-Request)
- `sinqiaRequestHeader` contains encrypted query parameters for GET endpoints

### Response Validation Patterns
```javascript
// Standard error validation
expect(response.statusCode).toBe(400);
expect(response.body).toHaveProperty("mensagem", "Solicitação Imprópria");
expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-xxxx");

// Success validation for paginated results
expect(response.statusCode).toBe(200);
expect(Array.isArray(response.body.Data)).toBe(true);
expect(response.body.Data.length).toBeGreaterThan(0);
```

### Mandatory afterEach Pattern
```javascript
afterEach(() => {
    EscreveLog.gravarLog(descricaoTeste, response, headers, params, rotaUrl);
    global.apiResponse = null;
    global.virtualResponse = null;
    global.Bearer = "";
    descricaoTeste = "";
});
```

## BDD Integration

- Test scenarios automatically generate `.feature` files in `bdd/`
- CSV test case files are generated with format: `NOME;OBJETIVO;PRECONDICAO;STATUS;PRIORIDADE;ESTIMATIVA;FUNCIONALIDADE;SCRPIT`
- BDD scripts are embedded as single-line entries in CSV files

## Entity Configuration

Entities are defined in `globals/entidades.js` with Basic auth and clientKey. Currently supports "VALIA" and "VISAOPREV".

## Development Workflow

1. Create test file following naming convention
2. Use entity "VALIA" for new tests
3. Implement standard authentication and header patterns  
4. Generate BDD and CSV artifacts for test documentation
5. Run tests with `npx jest --config jest.config.js` + current file name

## Key Globals

- `global.baseUrl`: API base URL
- `global.Bearer`: Authentication token
- `global.apiResponse`: Last API response for debugging

## Instructions for creating the file with the BDD test scripts

1. Identifique o cenário de teste que deseja automatizar.
2. Crie um arquivo `.feature` correspondente na pasta `bdd/`.
3. Escreva o cenário em linguagem Gherkin, seguindo o formato:
   ```
   Feature: [Nome da Feature]
       Scenario: [Nome do Cenário]
           Given [Pré-condição]
           When [Ação]
           Then [Resultado Esperado]
   ```
4. Utilize os dados de entrada e saída dos testes automatizados como base para os passos.
5. Execute os testes para garantir que a automação está funcionando corretamente.

## Instructions for creating a .csv file with test cases for import into Jira

1. Crie um arquivo `.csv` na pasta `csv/`.
2. Utilize o seguinte formato para cada linha do arquivo:
   ```
   NOME;OBJETIVO;PRECONDICAO;STATUS;PRIORIDADE;ESTIMATIVA;SCRIPT
   ```
3. Preencha os campos com as informações correspondentes ao seu caso de teste.
4. Salve o arquivo e utilize-o para importar os casos de teste no Jira.
