const PetsModel = require("../models/petsModel");

module.exports = (app) => {
  app.get("/pets", (req, res) => {
    PetsModel.listar(res);
  });

  app.get("/pets/:id", (req, res) => {
    const id = req.params.id;
    PetsModel.listarPorId(id, res);
  });

  app.post("/pets", (req, res) => {
    const pet = req.body;
    PetsModel.criar(pet, res);
  });
};
