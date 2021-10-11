const query = require("../infraestrutura/query");

class Atendimentos {
  adiciona(atendimento) {
    const sql = "INSERT INTO atendimentos SET ?";
    return query(sql, atendimento);
  }

  seleciona() {
    const sql = "SELECT * FROM atendimentos";
    return query(sql);
  }
  selecionaPorId(id) {
    const sql = `SELECT * FROM atendimentos WHERE id = ${id}`;
    return query(sql, id);
  }
  atualiza(valores, id) {
    const sql = "UPDATE atendimentos SET ? WHERE id = ?";
    return query(sql, [valores, id]);
  }
  deleta(id) {
    const sql = "DELETE FROM ATENDIMENTOS WHERE id = ?";
    return query(sql, id);
  }
}

module.exports = new Atendimentos();
