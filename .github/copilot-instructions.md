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
- CSV test case files are generated with format: `NOME;OBJETIVO;PRECONDICAO;STATUS;PRIORIDADE;ESTIMATIVA;SCRPIT`
- BDD scripts are embedded as single-line entries in CSV files

## Entity Configuration

Entities are defined in `globals/entidades.js` with Basic auth and clientKey. Currently supports "VALIA" and "VISAOPREV".

## Development Workflow

1. Create test file following naming convention
2. Use entity "VALIA" for new tests
3. Implement standard authentication and header patterns  
4. Generate BDD and CSV artifacts for test documentation
5. Run tests with `npm test`

## Key Globals

- `global.baseUrl`: API base URL
- `global.Bearer`: Authentication token
- `global.apiResponse`: Last API response for debugging
