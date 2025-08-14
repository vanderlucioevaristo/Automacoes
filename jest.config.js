const path = require('path');
const now = new Date();
const pad = n => n.toString().padStart(2, '0');
const dateStr = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}-${now.getMilliseconds()}`;

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFiles: ['dotenv/config'],
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        pageTitle: 'Relatório de Execução dos Testes',
        outputPath: path.join(__dirname, 'logsexecucao', `test-report_${dateStr}.html`),
        includeFailureMsg: true,
        includeConsoleLog: true
      }
    ]
  ]
};
