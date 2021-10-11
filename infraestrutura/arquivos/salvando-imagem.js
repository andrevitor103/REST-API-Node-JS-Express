const fs = require("fs");
const path = require("path");
const tiposImagem = ["jpg", "jpeg", "png"];
const tipoInvalido = (tipo) => {
  const tipoFormatado = tipo.substring(1);
  return tiposImagem.includes(tipoFormatado) == false;
};

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
  const tipoImagem = path.extname(caminho);
  let erro = false;
  if (tipoInvalido(tipoImagem)) {
    erro = "Tipo de imagem inválido";
    callbackImagemCriada(erro);
    return "";
  }

  const novoCaminho = `./imagens/${nomeDoArquivo}${tipoImagem}`;
  fs.createReadStream(caminho)
    .pipe(fs.createWriteStream(novoCaminho))
    .on("finish", () => {
      console.log("Imagem salva com sucesso...");
      callbackImagemCriada(erro, novoCaminho);
    });
};
