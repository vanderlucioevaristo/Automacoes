const fs = require('fs');
const path = require('path');

/**
 * Gerador automático de arquivos BDD (.feature) a partir de suítes de teste Jest
 * 
 * @param {string} arquivoTeste - Caminho para o arquivo de teste (.test.js)
 * @param {string} nomeFeature - Nome da feature para o arquivo BDD
 * @param {string} descricaoFeature - Descrição da feature
 * @returns {string} - Caminho do arquivo .feature gerado
 */
function gerarArquivoBDD(arquivoTeste, nomeFeature = null, descricaoFeature = null) {
    try {
        // Lê o conteúdo do arquivo de teste
        const conteudoTeste = fs.readFileSync(arquivoTeste, 'utf8');
        
        // Extrai o nome base do arquivo (sem extensão)
        const nomeBase = path.basename(arquivoTeste, '.test.js');
        
        // Define o nome da feature se não fornecido
        if (!nomeFeature) {
            nomeFeature = extrairNomeFeature(conteudoTeste, nomeBase);
        }
        
        // Define a descrição da feature se não fornecida
        if (!descricaoFeature) {
            descricaoFeature = extrairDescricaoFeature(conteudoTeste, nomeBase);
        }
        
        // Extrai todos os cenários de teste
        const cenarios = extrairCenarios(conteudoTeste);
        
        // Gera o conteúdo BDD
        const conteudoBDD = gerarConteudoBDD(nomeFeature, descricaoFeature, cenarios);
        
        // Define o caminho do arquivo .feature
        const caminhoFeature = path.join(
            path.dirname(arquivoTeste), 
            '..', 
            'bdd', 
            `${nomeBase}.feature`
        );
        
        // Cria o diretório bdd se não existir
        const diretorioBDD = path.dirname(caminhoFeature);
        if (!fs.existsSync(diretorioBDD)) {
            fs.mkdirSync(diretorioBDD, { recursive: true });
        }
        
        // Escreve o arquivo .feature
        fs.writeFileSync(caminhoFeature, conteudoBDD, 'utf8');
        
        console.log(`✅ Arquivo BDD gerado: ${caminhoFeature}`);
        return caminhoFeature;
        
    } catch (error) {
        console.error(`❌ Erro ao gerar arquivo BDD: ${error.message}`);
        throw error;
    }
}

/**
 * Extrai o nome da feature baseado no conteúdo do teste
 */
function extrairNomeFeature(conteudo, nomeBase) {
    // Procura por padrões comuns de descrição da suíte
    const matchDescribe = conteudo.match(/describe\s*\(\s*["'`]([^"'`]+)["'`]/);
    if (matchDescribe) {
        return matchDescribe[1].replace(/SCAF\s*-\s*Previdência\s*-\s*/i, '').trim();
    }
    
    // Fallback para o nome do arquivo formatado
    return nomeBase.replace(/teste/, '').replace(/([A-Z])/g, ' $1').trim();
}

/**
 * Extrai a descrição da feature baseada no conteúdo
 */
function extrairDescricaoFeature(conteudo, nomeBase) {
    // Mapeia tipos de teste para descrições padrão
    const descricoesPadrao = {
        'cadastro': 'Operações de cadastro e consulta',
        'participante': 'Consulta de participante do cadastro',
        'empregador': 'Consulta de empregador e locais',
        'adesao': 'Operações de adesão',
        'contribuicao': 'Operações de contribuição',
        'beneficio': 'Operações de benefício'
    };
    
    // Procura por palavras-chave no nome do arquivo
    for (const [palavra, descricao] of Object.entries(descricoesPadrao)) {
        if (nomeBase.toLowerCase().includes(palavra)) {
            return descricao;
        }
    }
    
    return 'Funcionalidades do sistema';
}

/**
 * Extrai todos os cenários de teste do arquivo
 */
function extrairCenarios(conteudo) {
    const cenarios = [];
    
    // Regex para capturar blocos it() ou test()
    const regexCenarios = /(?:it|test)\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*async\s*\(\s*\)\s*=>\s*{([\s\S]*?)}\s*\);/g;
    
    let match;
    while ((match = regexCenarios.exec(conteudo)) !== null) {
        const descricaoTeste = match[1];
        const corpoTeste = match[2];
        
        const cenarioBDD = gerarCenarioBDD(descricaoTeste, corpoTeste);
        cenarios.push(cenarioBDD);
    }
    
    return cenarios;
}

/**
 * Gera um cenário BDD individual
 */
function gerarCenarioBDD(descricaoTeste, corpoTeste) {
    const linhas = [];
    
    // Adiciona condições prévias (Given/And)
    linhas.push('  Given que o sistema SCAF está operacional');
    linhas.push('  And eu tenho acesso a credenciais de autenticação válidas');
    
    // Extrai endpoint da URL
    const matchUrl = corpoTeste.match(/["'`]([^"'`]*\/[^"'`]+)["'`]/);
    if (matchUrl) {
        const endpoint = matchUrl[1];
        linhas.push(`  And o endpoint ${endpoint} está disponível`);
    }
    
    // Adiciona autenticação se presente
    if (corpoTeste.includes('obterToken') || corpoTeste.includes('Bearer')) {
        linhas.push('  Given eu tenho um token de autenticação válido');
    }
    
    // Adiciona condições específicas baseadas no teste
    if (corpoTeste.includes('sinqiaRequestHeader')) {
        if (descricaoTeste.toLowerCase().includes('cpf')) {
            if (descricaoTeste.toLowerCase().includes('incorreto') || descricaoTeste.toLowerCase().includes('inválido')) {
                linhas.push('  And eu tenho um CPF inválido criptografado no header X-SINQIA-Request');
            } else if (descricaoTeste.toLowerCase().includes('inexistente')) {
                linhas.push('  And eu tenho um CPF inexistente criptografado no header X-SINQIA-Request');
            } else if (descricaoTeste.toLowerCase().includes('nulo')) {
                linhas.push('  And eu tenho um CPF nulo criptografado no header X-SINQIA-Request');
            } else {
                linhas.push('  And eu tenho um CPF válido criptografado no header X-SINQIA-Request');
            }
        }
        
        if (descricaoTeste.toLowerCase().includes('contratoplano')) {
            if (descricaoTeste.toLowerCase().includes('inexistente')) {
                linhas.push('  And eu tenho um ContratoPlano inexistente criptografado no header X-SINQIA-Request');
            } else {
                linhas.push('  And eu tenho um ContratoPlano válido criptografado no header X-SINQIA-Request');
            }
        }
    }
    
    // Adiciona parâmetros de paginação
    const matchPagina = corpoTeste.match(/pagina:\s*(\d+)/);
    const matchTamanho = corpoTeste.match(/tamanho_pagina:\s*(\d+)/);
    if (matchPagina && matchTamanho) {
        linhas.push(`  And os parâmetros de paginação são pagina=${matchPagina[1]} e tamanho_pagina=${matchTamanho[1]}`);
    }
    
    // Adiciona condições especiais
    if (descricaoTeste.toLowerCase().includes('tempo') && descricaoTeste.toLowerCase().includes('nulo')) {
        linhas.push('  And eu tenho um participante com tempoPlano e tempoEmprego nulos no banco');
    } else if (descricaoTeste.toLowerCase().includes('tempo') && descricaoTeste.toLowerCase().includes('zerado')) {
        linhas.push('  And eu tenho um participante com tempoPlano e tempoEmprego zerados no banco');
    }
    
    // Adiciona ação (When)
    if (corpoTeste.includes('.get(')) {
        if (descricaoTeste.toLowerCase().includes('específico') || corpoTeste.includes('sinqiaRequestHeader')) {
            linhas.push('  When eu envio uma requisição GET para consultar um participante específico');
        } else {
            linhas.push('  When eu envio uma requisição GET para o endpoint');
        }
    } else if (corpoTeste.includes('.post(')) {
        linhas.push('  When eu envio uma requisição POST para o endpoint');
    }
    
    // Adiciona resultados esperados (Then/And)
    const matchStatus = corpoTeste.match(/expect\s*\(\s*response\.statusCode\s*\)\.toBe\s*\(\s*(\d+)\s*\)/);
    if (matchStatus) {
        const statusCode = matchStatus[1];
        if (statusCode === '200') {
            linhas.push('  Then o sistema deve retornar os dados com status code 200');
            
            if (descricaoTeste.toLowerCase().includes('paginação')) {
                linhas.push('  And deve conter informações de paginação válidas');
            }
            
            if (descricaoTeste.toLowerCase().includes('dados pessoais')) {
                linhas.push('  And deve retornar os dados pessoais completos do participante');
            } else if (descricaoTeste.toLowerCase().includes('cpf')) {
                linhas.push('  And deve retornar os dados pessoais do participante');
                linhas.push('  And deve incluir CPF, nome, data de nascimento e documentos');
            }
            
            if (descricaoTeste.toLowerCase().includes('tempo')) {
                linhas.push('  And os campos TempoPlano e TempoEmprego devem retornar 0');
            }
            
        } else if (statusCode === '400') {
            linhas.push('  Then o sistema deve retornar um erro com status code 400');
            linhas.push('  And a mensagem deve ser "Solicitação Imprópria"');
            
            // Adiciona códigos de erro específicos
            const matchErro = corpoTeste.match(/["'`](erro-cad-\d+)["'`]/);
            if (matchErro) {
                linhas.push(`  And deve conter o código de erro "${matchErro[1]}"`);
            }
            
            // Adiciona mensagens específicas
            if (descricaoTeste.toLowerCase().includes('paginação')) {
                linhas.push('  And deve informar que o tamanho da página deve estar entre 0 e 50');
            } else if (descricaoTeste.toLowerCase().includes('cpf') && descricaoTeste.toLowerCase().includes('inválido')) {
                linhas.push('  And deve informar "CPF inválido"');
            } else if (descricaoTeste.toLowerCase().includes('não encontrado') || descricaoTeste.toLowerCase().includes('inexistente')) {
                linhas.push('  And deve informar "Participante não encontrado para o parâmetro informado"');
            }
        }
    }
    
    return linhas.join('\n');
}

/**
 * Gera o conteúdo completo do arquivo BDD
 */
function gerarConteudoBDD(nomeFeature, descricaoFeature, cenarios) {
    const linhas = [];
    
    linhas.push(`Feature: ${nomeFeature}`);
    linhas.push('');
    
    // Adiciona cada cenário
    cenarios.forEach((cenario, index) => {
        if (index > 0) {
            linhas.push('');
        }
        linhas.push(cenario);
    });
    
    return linhas.join('\n') + '\n';
}

/**
 * Função principal para ser chamada após execução de suítes de teste
 * Pode ser integrada em hooks do Jest
 */
function processarSuiteTeste(arquivoTeste) {
    console.log(`🔄 Processando suíte de teste: ${arquivoTeste}`);
    
    try {
        const caminhoFeature = gerarArquivoBDD(arquivoTeste);
        console.log(`✅ Arquivo BDD atualizado: ${caminhoFeature}`);
        return caminhoFeature;
    } catch (error) {
        console.error(`❌ Erro ao processar suíte: ${error.message}`);
        return null;
    }
}

/**
 * Hook para integração com Jest - adicione no setupFilesAfterEnv
 */
function configurarHookJest() {
    if (typeof afterAll !== 'undefined') {
        afterAll(() => {
            // Obtém o arquivo de teste atual do contexto Jest
            const arquivoTeste = expect.getState().testPath;
            if (arquivoTeste && arquivoTeste.endsWith('.test.js')) {
                processarSuiteTeste(arquivoTeste);
            }
        });
    }
}

module.exports = {
    gerarArquivoBDD,
    processarSuiteTeste,
    configurarHookJest
};
