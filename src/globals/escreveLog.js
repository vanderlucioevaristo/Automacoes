class EscreveLog {
  static gravarLog(descricao, response, headers, params, rotaUrl) {
    const path = require("path");
    const fs = require("fs");
    const PayloadChamada = require("./payloadChamada");
    
    const payload = new PayloadChamada("GET",global.baseUrl + rotaUrl,headers,response.body,params);
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const logName = `${descricao}_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}.txt`;
    // Garante que o diretório existe antes de gravar o arquivo
    // Usa o diretório raiz do projeto para gravar o log, igual ao test-report
    const projectRoot = path.resolve(__dirname, '../../');
    const logDir = path.join(projectRoot, 'logsexecucao');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logPath = path.join(logDir, logName);
    fs.writeFileSync(logPath, payload.toString());
  }
}

module.exports = EscreveLog;
