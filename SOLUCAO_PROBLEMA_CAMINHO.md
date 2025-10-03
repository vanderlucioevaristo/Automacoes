# Solução para o Problema "O sistema não pode encontrar o caminho especificado"

## Problema Identificado
O erro "O sistema não pode encontrar o caminho especificado" ocorria devido a múltiplos fatores:

1. **Política de Execução do PowerShell**: Estava restrita
2. **PATH do Node.js**: Não estava funcionando corretamente  
3. **Múltiplos arquivos de configuração Jest**: `jest.config.js` e `jest.config.json`
4. **Pasta logsexecucao ausente**: Necessária para relatórios

## Soluções Aplicadas

### 1. Política de Execução
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Correção do PATH temporário
Execute o script criado antes de rodar os testes:
```powershell
.\fix-path.ps1
```

### 3. Pasta de logs criada
Criada a pasta `logsexecucao` que estava faltando.

### 4. Scripts atualizados no package.json
Os scripts foram atualizados para usar o caminho correto do Jest:
```json
"test": "node \"./node_modules/jest/bin/jest.js\" --config jest.config.js"
```

## Como usar agora

### Primeira vez (configuração única):
```powershell
# 1. Definir política de execução
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 2. Corrigir PATH
.\fix-path.ps1
```

### Para executar os testes:
```powershell
# Sempre execute o fix-path primeiro em uma nova sessão
.\fix-path.ps1

# Depois execute os testes
npm test
```

### Comandos alternativos disponíveis:
- `npm run test:default` - Execução padrão
- `npm run test:bdd` - Com configuração BDD
- `npm run test:report` - Com relatório verbose
- `npm run test:watch` - Modo watch
- `npm run test:coverage` - Com cobertura

## Observações Importantes

1. **Múltiplas configurações Jest**: O projeto tem duas configurações. Use `jest.config.js` como padrão.
2. **Falhas de teste**: As falhas que aparecem agora são problemas de lógica/API, não de configuração.
3. **PATH temporário**: O fix-path.ps1 precisa ser executado a cada nova sessão do PowerShell.

## Próximos passos

Agora que os testes executam, você pode focar em:
1. Corrigir os testes que estão falhando
2. Verificar problemas de validação de campos
3. Ajustar parâmetros de API conforme necessário