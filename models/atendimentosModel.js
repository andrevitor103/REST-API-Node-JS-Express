const conexao = require("../infraestrutura/conexao");
const moment = require("moment");
const axios = require("axios");
const repositorio = require("../Repositorio/Atendimentos");

class atendimentoModel {
  constructor() {
    this.dataAgendamentoValida = ({ dataAgendamento, data }) => {
      return moment(dataAgendamento).isSameOrAfter(data);
    };

    this.nomeValido = ({ tamanho }) => tamanho > 2;
    this.validacoes = [
      {
        nome: "data",
        valido: this.dataAgendamentoValida,
        mensagem: "Data de agendamento inválida",
      },
      {
        nome: "cliente",
        valido: this.nomeValido,
        mensagem: "Cliente deve ter pelo menos 2 caracteres",
      },
    ];
    this.valida = (parametros) => {
      return this.validacoes.filter((campos) => {
        const { nome } = campos;
        const parametro = parametros[nome];
        return !campos.valido(parametro);
      });
    };
  }

  async adicionar(atendimento) {
    const data = await new moment().format("YYYY-MM-DD HH:mm:ss");

    atendimento.DATA_AGENDAMENTO = moment(
      atendimento.DATA_AGENDAMENTO,
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD HH:mm:ss");

    const dataAgendamento = atendimento.DATA_AGENDAMENTO;

    atendimento = { ...atendimento, data };

    const parametros = {
      data: { dataAgendamento, data },
      cliente: { tamanho: atendimento.cliente.length },
    };

    const erros = this.valida(parametros);
    console.log(erros);
    if (erros.length) {
      console.log(erros);
      return new Promise((resolve, reject) => {
        reject(erros);
      });
    }

    return repositorio.adiciona(atendimento).then((resultado) => {
      const { insertId } = resultado;
      return { id: insertId, ...atendimento };
    });
  }

  selecionar() {
    return repositorio.seleciona();
  }
  selecionarPorId(id) {
    return repositorio.selecionaPorId(id).then(async (resposta) => {
      const atendimento = resposta[0];
      const cpf = atendimento.cliente;
      const { data } = await axios.get(`http://localhost:8082/${cpf}`);
      atendimento.cliente = data;

      return atendimento;
    });
  }
  atualizar(valores, id) {
    return repositorio.atualiza(valores, id).then((resposta) => {
      return { id, ...valores };
    });
  }

  deletar(id) {
    return repositorio.deleta(id).then((resposta) => {
      return { id };
    });
  }
}

module.exports = new atendimentoModel();
