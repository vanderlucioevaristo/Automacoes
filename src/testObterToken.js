// Script para testar a função de obtenção do token de autenticação
// Executa a função e exibe o resultado no console

const obterToken = require("./obterToken");

(async () => {
  try {
    await obterToken("VISAOPREV");
    // Exibe o token obtido
    console.log("Token Bearer obtido:", global.Bearer);
  } catch (error) {
    // Exibe erro caso ocorra
    console.error("Erro ao obter o token:", error.message);
  }
})();
