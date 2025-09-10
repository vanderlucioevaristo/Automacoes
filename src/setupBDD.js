// Configuração para integração automática do gerador BDD com Jest
// Este arquivo deve ser referenciado no setupFilesAfterEnv do jest.config.js

const { processarSuiteTeste } = require('./globals/geradorBDD');

// Hook global que executa após cada suíte de teste
global.afterAll = ((originalAfterAll) => {
    return function(fn, timeout) {
        return originalAfterAll(() => {
            // Executa a função original se fornecida
            if (fn) {
                fn();
            }
            
            // Gera o arquivo BDD automaticamente
            const arquivoTeste = expect.getState().testPath;
            if (arquivoTeste && arquivoTeste.endsWith('.test.js')) {
                try {
                    processarSuiteTeste(arquivoTeste);
                } catch (error) {
                    console.warn(`⚠️  Não foi possível gerar BDD para ${arquivoTeste}: ${error.message}`);
                }
            }
        }, timeout);
    };
})(global.afterAll || (() => {}));

console.log('🚀 Gerador automático de BDD configurado');
