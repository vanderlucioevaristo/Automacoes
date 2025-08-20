# Estrutura do Projeto

- `src/` — Código-fonte e testes
- `__mocks__/` — Mocks para testes
- `package.json` — Configuração e dependências
- `README.md` — Documentação

## Dependências

- Jest: Framework de testes
- Supertest: Testes de API REST
- MSW: Mock Service Worker para simular APIs
- Dotenv: Variáveis de ambiente
- Cross-env: Compatibilidade de variáveis de ambiente

## Como instalar

Execute:

```
npm install
```

## Como executar os testes

```
npm test
```

## Como preparar mocks

- Utilize a pasta `__mocks__` para scripts de mocks
- Para inicializar MSW:

```
npm run start:mock
```

## Observações

- O projeto está pronto para receber automações e integração com servidor de mocks.
