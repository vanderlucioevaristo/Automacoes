// Exemplo de uso manual do gerador BDD
// Execute este script para gerar arquivos BDD para testes específicos

const { gerarArquivoBDD, processarSuiteTeste } = require('./globals/geradorBDD');
const path = require('path');

/**
 * Exemplo de uso da função para gerar BDD de um arquivo específico
 */
async function exemploUso() {
    try {
        console.log('🔄 Iniciando geração de arquivos BDD...\n');
        
        // Exemplo 1: Gerar BDD para testeCadastroParticipante.test.js
        const arquivoParticipante = path.join(__dirname, 'testeCadastroParticipante.test.js');
        console.log('📄 Processando testeCadastroParticipante.test.js');
        await processarSuiteTeste(arquivoParticipante);
        
        // Exemplo 2: Gerar BDD com parâmetros customizados
        console.log('\n📄 Processando com parâmetros customizados');
        const caminhoFeature = gerarArquivoBDD(
            arquivoParticipante,
            'Consulta de Participantes',
            'Funcionalidades de consulta e validação de participantes do sistema'
        );
        
        console.log(`\n✅ Processamento concluído!`);
        console.log(`📁 Arquivo gerado: ${caminhoFeature}`);
        
    } catch (error) {
        console.error(`❌ Erro durante o processamento: ${error.message}`);
    }
}

/**
 * Processar todos os arquivos de teste da pasta src
 */
async function processarTodosOsTestes() {
    const fs = require('fs');
    const srcPath = __dirname;
    
    try {
        const arquivos = fs.readdirSync(srcPath);
        const arquivosTeste = arquivos.filter(arquivo => arquivo.endsWith('.test.js'));
        
        console.log(`🔄 Encontrados ${arquivosTeste.length} arquivos de teste\n`);
        
        for (const arquivo of arquivosTeste) {
            const caminhoCompleto = path.join(srcPath, arquivo);
            console.log(`📄 Processando ${arquivo}...`);
            
            try {
                await processarSuiteTeste(caminhoCompleto);
                console.log(`✅ ${arquivo} processado com sucesso`);
            } catch (error) {
                console.error(`❌ Erro ao processar ${arquivo}: ${error.message}`);
            }
        }
        
        console.log('\n🎉 Processamento de todos os testes concluído!');
        
    } catch (error) {
        console.error(`❌ Erro ao listar arquivos: ${error.message}`);
    }
}

// Exporta as funções para uso em outros scripts
module.exports = {
    exemploUso,
    processarTodosOsTestes
};

// Se executado diretamente, roda o exemplo
if (require.main === module) {
    console.log('🚀 Executando gerador BDD...\n');
    
    // Pergunta ao usuário qual operação executar
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Escolha uma opção:\n1 - Processar arquivo específico\n2 - Processar todos os arquivos de teste\n\nOpção: ', (resposta) => {
        rl.close();
        
        if (resposta === '1') {
            exemploUso();
        } else if (resposta === '2') {
            processarTodosOsTestes();
        } else {
            console.log('❌ Opção inválida');
        }
    });
}
