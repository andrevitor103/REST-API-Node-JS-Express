const conexao = require("../infraestrutura/conexao");
const uploadDeArquivos = require("../infraestrutura/arquivos/salvando-imagem");

class PetsModel {
  constructor() {}

  listar(res) {
    const sql = "SELECT * FROM pets";
    conexao.query(sql, (erro, response) => {
      if (erro) {
        res.status(400).json(erro);
        return "";
      }
      res.status(200).json(response);
    });
  }

  listarPorId(id, res) {
    const sql = `SELECT * FROM pets WHERE id = ${id}`;

    conexao.query(sql, (erro, response) => {
      if (erro) {
        res.status(400).json(erro);
        return "";
      }
      res.status(200).json(response);
    });
  }

  criar(pet, res) {
    const sql = "INSERT INTO pets SET ?";

    uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {
      if (erro) {
        res.status(400).json(erro);
        return "";
      }
      const novoPet = { nome: pet.nome, imagem: novoCaminho };
      conexao.query(sql, novoPet, (erro, response) => {
        if (erro) {
          res.status(400).json({ erro });
          return "";
        }
        res.status(201).json(novoPet);
      });
    });
  }
}

module.exports = new PetsModel();
