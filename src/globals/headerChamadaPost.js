// Classe para montar os headers das chamadas à API
// Os valores são definidos conforme a entidade e a chamada

class HeaderChamadaPost {
  /**
   * @param {Object} entidade Entidade utilizada na chamada
   * @param {string} rota Valor para o header X-SINQIA-Rota

   */
  constructor(entidade, rota) {
    this.headers = {
      "X-SINQIA-Rota": rota, // Valor da rota
      "X-SINQIA-Client-Key": entidade.clientKey, // Valor do clientKey da entidade
      Authorization: entidade.basic, // Valor do basic da entidade
    };
  }

  /**
   * Retorna os headers montados
   */
  getHeaders() {
    return this.headers;
  }
}

module.exports = HeaderChamadaPost;
