//Classe para montar o playload da chamada para ser impresa no log ou no console

class PayloadChamada {
  /**
   * @param {string} metodo - O método HTTP da chamada (GET, POST, etc.)
   * @param {string} url - A URL da chamada
   * @param {Object} headers - Os headers da chamada
   * @param {Object} response - O corpo da chamada (para métodos como POST)
   * @param {Object} params - Os parâmetros de consulta da chamada
   */

  constructor(metodo, url, headers, response, params) {
    this.metodo = metodo;
    this.url = url;
    this.headers = headers;
    this.body = response;
    this.params = params;
  }

  toString() {
    return JSON.stringify({
      metodo: this.metodo,
      url: this.url,
      headers: this.headers,
      body: this.body,
      params:this.params
    },null, 2);
  }
}

module.exports = PayloadChamada;
