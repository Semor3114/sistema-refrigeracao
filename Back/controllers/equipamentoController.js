const Equipamento = require('../models/equipamentoModel');

async function listar(req, res) {
    try {
        res.json(await Equipamento.listar());
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function buscar(req, res) {
    try {
        const equipamento = await Equipamento.buscarPorId(req.params.id);
        if (!equipamento) {
            return res.status(404).json({ mensagem: 'Equipamento não encontrado' });
        }
        res.json(equipamento);
    } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: erro.message });
}
}

async function inserir(req, res) {
    try {
        const { eqp_nome, eqp_tipo } = req.body;
        if (!eqp_nome || !eqp_tipo) {
            return res.status(400).json({ mensagem: 'Nome e tipo são obrigatórios' });
        }
        const equipamento = await Equipamento.inserir(req.body);
        res.status(201).json(equipamento);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function atualizar(req, res) {
    try {
        const { eqp_nome, eqp_tipo } = req.body;
        if (!eqp_nome || !eqp_tipo) {
            return res.status(400).json({ mensagem: 'Nome e tipo são obrigatórios' });
        }
        const equipamento = await Equipamento.atualizar(req.params.id, req.body);
        if (!equipamento) {
            return res.status(404).json({ mensagem: 'Equipamento não encontrado' });
        }
        res.json(equipamento);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

async function excluir(req, res) {
    try {
        const removidos = await Equipamento.excluir(req.params.id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Equipamento não encontrado' });
        }
        res.json({ mensagem: 'Equipamento excluído com sucesso' });
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

module.exports = { listar, buscar, inserir, atualizar, excluir };
