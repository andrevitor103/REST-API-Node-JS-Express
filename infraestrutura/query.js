const conexao = require("./conexao");

const executarQuery = (query, parametros = "") => {
  return new Promise((resolve, reject) => {
    conexao.query(query, parametros, (erro, resposta, campos) => {
      if (erro) {
        reject(erro);
      }
      resolve(resposta);
    });
  });
};

module.exports = executarQuery;
