const atendimentosModel = require("../models/atendimentosModel");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    atendimentosModel
      .selecionar()
      .then((atendimentos) => res.status(200).json(atendimentos))
      .catch((erro) => {
        res.status(400).json(erro);
      });
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    atendimentosModel
      .selecionarPorId(id)
      .then((atendimento) => {
        res.status(200).json(atendimento);
      })
      .catch((erro) =>
        res.status(404).json("Desculpa atendimento não encontrado")
      );
  });

  app.post("/atendimentos", (req, res) => {
    atendimentosModel
      .adicionar(req.body)
      .then((atendimentoCadastrado) => {
        return res.status(201).json(atendimentoCadastrado);
      })
      .catch((erro) => {
        return res.status(400).json(erro);
      });
  });
  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;
    atendimentosModel
      .atualizar(valores, id)
      .then((resposta) => {
        return res.status(200).json(resposta);
      })
      .catch((erro) => {
        return res.status(400).json(erro);
      });
  });
  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    atendimentosModel
      .deletar(id)
      .then((resposta) => {
        return res.status(200).json(resposta);
      })
      .catch((erro) => {
        return res.status(400).json(erro);
      });
  });
};
