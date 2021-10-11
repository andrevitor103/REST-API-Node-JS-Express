const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const faker = require("faker");

app.use(bodyParser());

app.get("/:cpf", (req, res) => {
  const cpf = req.params.cpf;
  res.status(200).json({
    cpf: cpf,
    nome: faker.name.findName(),
    dataNascimento: faker.date.past(),
  });
});

app.listen(8082, (erro) => {
  if (erro) {
    console.log("Problema ao subir servidor");
    return;
  }
  console.log("Servidor rodando...");
});

