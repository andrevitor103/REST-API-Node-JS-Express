class tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarTabelaAtendimentos();
    this.criarTabelaPets();
  }

  criarTabelaAtendimentos() {
    const sql = `
        CREATE TABLE IF NOT EXISTS atendimentos(
        id INT NOT NULL AUTO_INCREMENT,
        cliente VARCHAR(50) NOT NULL,
        pet VARCHAR(20),
        servico VARCHAR(20) NOT NULL,
        STATUS VARCHAR(20) NOT NULL,
        observacoes TEXT,
        DATA datetime NOT NULL,
        DATA_AGENDAMENTO datetime NOT NULL, 
        PRIMARY KEY(id)
    )`;
    this.conexao.query(sql, (error) => {
      if (error) {
        console.log(error);
        return "";
      }
      console.log("Tabela criada com sucesso");
    });
  }

  criarTabelaPets() {
    const sql = `
      CREATE TABLE IF NOT EXISTS  pets (
        id INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(100) NOT NULL,
        imagem VARCHAR(200) NOT NULL,
        PRIMARY KEY(id)
      )
    `;

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
        return "";
      }
      console.log("Tabela Pets criado com sucesso...");
    });
  }
}

module.exports = new tabelas();
