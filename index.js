const customExpress = require("./config/customExpress");
const conexao = require("./infraestrutura/conexao");
const tabelas = require("./infraestrutura/tabelas");
const app = customExpress();

conexao.connect((error) => {
  if (error) {
    console.log(error);
    return "";
  }

  tabelas.init(conexao);

  app.listen(3000, () => {
    console.log("Servidor rodando...");
  });
});
