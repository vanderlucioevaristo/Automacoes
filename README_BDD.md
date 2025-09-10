# Gerador Automático de Arquivos BDD

Esta funcionalidade permite gerar automaticamente arquivos `.feature` em formato BDD (Behavior Driven Development) a partir de suítes de teste Jest.

## 🚀 Funcionalidades

- **Geração automática**: Arquivos BDD são gerados após a execução de cada suíte de teste
- **Integração com Jest**: Configuração automática via hooks do Jest
- **Execução manual**: Scripts para gerar BDD de arquivos específicos ou todos de uma vez
- **Formato padronizado**: Scripts BDD com palavras reservadas em inglês e instruções em português brasileiro
- **Sem cenários desnecessários**: Remove a linha "Scenario" conforme especificado

## 📁 Estrutura de Arquivos

```
src/
├── globals/
│   └── geradorBDD.js          # Função principal do gerador
├── setupBDD.js                # Configuração automática para Jest
├── exemploGeradorBDD.js       # Scripts de exemplo e execução manual
└── testeCadastroParticipante.test.js  # Exemplo de arquivo de teste

bdd/                           # Pasta onde os arquivos .feature são gerados
├── testeCadastroParticipante.feature
└── ...

jest.config.json              # Configuração Jest com integração BDD
```

## 🛠️ Como Usar

### 1. Execução Automática (Recomendado)

A geração automática está configurada para executar após cada suíte de teste:

```bash
# Executa testes com geração automática de BDD
npm run test:bdd
```

### 2. Execução Manual

#### Gerar BDD para arquivo específico:
```bash
npm run generate:bdd
```

#### Gerar BDD para todos os arquivos de teste:
```bash
npm run generate:bdd:all
```

#### Usar a função diretamente no código:
```javascript
const { gerarArquivoBDD, processarSuiteTeste } = require('./globals/geradorBDD');

// Gerar BDD para um arquivo específico
processarSuiteTeste('./testeCadastroParticipante.test.js');

// Gerar com parâmetros customizados
gerarArquivoBDD(
    './testeCadastroParticipante.test.js',
    'Nome da Feature',
    'Descrição da feature'
);
```

## 📝 Formato dos Arquivos BDD Gerados

Os arquivos `.feature` seguem este padrão:

```gherkin
Feature: Consulta de participante do cadastro

  Given que o sistema SCAF está operacional
  And eu tenho acesso a credenciais de autenticação válidas
  And o endpoint /Cadastro/participante está disponível
  Given eu tenho um token de autenticação válido
  When eu envio uma requisição GET com pagina=1 e tamanho_pagina=51
  Then o sistema deve retornar um erro com status code 400
  And a mensagem deve ser "Solicitação Imprópria"
  And deve conter o código de erro "erro-cad-1005"
```

## ⚙️ Configuração

### Configuração Automática (Jest)

O arquivo `jest.config.json` já está configurado para usar o gerador automático:

```json
{
  "setupFilesAfterEnv": ["<rootDir>/src/setupBDD.js"],
  "globals": {
    "AUTO_GENERATE_BDD": true
  }
}
```

### Configuração Manual

Para integrar em projetos existentes, adicione ao seu `setupFilesAfterEnv`:

```javascript
const { configurarHookJest } = require('./globals/geradorBDD');
configurarHookJest();
```

## 🔧 Funcionalidades da Função

### `gerarArquivoBDD(arquivoTeste, nomeFeature?, descricaoFeature?)`

**Parâmetros:**
- `arquivoTeste` (string): Caminho para o arquivo `.test.js`
- `nomeFeature` (string, opcional): Nome customizado da feature
- `descricaoFeature` (string, opcional): Descrição customizada da feature

**Retorna:** Caminho do arquivo `.feature` gerado

### `processarSuiteTeste(arquivoTeste)`

Versão simplificada que usa detecção automática de nome e descrição.

## 📋 Mapeamento Automático

A função detecta automaticamente:

- **Endpoints**: Extrai URLs dos testes para gerar condições Given
- **Autenticação**: Detecta uso de tokens Bearer
- **Parâmetros**: Identifica paginação e parâmetros de consulta
- **Headers criptografados**: Reconhece X-SINQIA-Request
- **Status codes**: Mapeia expects para Then/And apropriados
- **Códigos de erro**: Extrai códigos "erro-cad-xxxx" dos testes

## 🎯 Exemplos de Detecção

### Entrada (Teste Jest):
```javascript
it("SCAF - Previdência - Cadastro - Participante - Get - Paginação maior que 50 - Status code 400", async () => {
    params = { pagina: 1, tamanho_pagina: 51 };
    response = await supertest(global.baseUrl)
        .get("/Cadastro/participante")
        .set(headers)
        .query(params);
    
    expect(response.statusCode).toBe(400);
    expect(response.body.campos[0]).toHaveProperty("codigo_erro", "erro-cad-1005");
});
```

### Saída (BDD):
```gherkin
Given que o sistema SCAF está operacional
And eu tenho acesso a credenciais de autenticação válidas
And o endpoint /Cadastro/participante está disponível
And os parâmetros de paginação são pagina=1 e tamanho_pagina=51
When eu envio uma requisição GET para o endpoint
Then o sistema deve retornar um erro com status code 400
And deve conter o código de erro "erro-cad-1005"
```

## 🚨 Tratamento de Erros

A função inclui tratamento robusto de erros:
- Logs detalhados para debugging
- Fallbacks para nomes/descrições automáticos
- Criação automática de diretórios
- Validação de arquivos de entrada

## 💡 Dicas de Uso

1. **Nomes descritivos**: Use nomes descritivos nos testes `it()` para melhor geração BDD
2. **Padrões consistentes**: Mantenha padrões nos testes para melhor detecção automática
3. **Validação**: Sempre revise os arquivos `.feature` gerados
4. **Customização**: Use parâmetros opcionais para features específicas

## 🔄 Integração com CI/CD

Para integrar em pipelines:

```bash
# No seu pipeline, após executar testes
npm run test:bdd
npm run generate:bdd:all

# Commitar arquivos BDD gerados
git add bdd/
git commit -m "Atualizar arquivos BDD"
```
