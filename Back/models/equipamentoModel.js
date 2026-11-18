const pool = require('../db');

async function listar() {
    const result = await pool.query('SELECT * FROM equipamento ORDER BY eqp_id');
    return result.rows;
}

async function buscarPorId(id) {
    const result = await pool.query('SELECT * FROM equipamento WHERE eqp_id = $1', [id]);
    return result.rows[0];
}

async function inserir({ eqp_nome, eqp_tipo, eqp_marca, eqp_potencia_btu }) {
    const result = await pool.query(
        `INSERT INTO equipamento (eqp_nome, eqp_tipo, eqp_marca, eqp_potencia_btu)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [eqp_nome, eqp_tipo, eqp_marca || null, eqp_potencia_btu || null]
    );
    return result.rows[0];
}

async function atualizar(id, { eqp_nome, eqp_tipo, eqp_marca, eqp_potencia_btu }) {
    const result = await pool.query(
        `UPDATE equipamento
         SET eqp_nome = $1, eqp_tipo = $2, eqp_marca = $3, eqp_potencia_btu = $4
         WHERE eqp_id = $5 RETURNING *`,
        [eqp_nome, eqp_tipo, eqp_marca || null, eqp_potencia_btu || null, id]
    );
    return result.rows[0];
}

async function excluir(id) {
    const result = await pool.query('DELETE FROM equipamento WHERE eqp_id = $1', [id]);
    return result.rowCount;
}

module.exports = { listar, buscarPorId, inserir, atualizar, excluir };
