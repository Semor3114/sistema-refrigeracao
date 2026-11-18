import API_URL from './api.js';

const URL = `${API_URL}/equipamentos`;
const headers = { 'Content-Type': 'application/json' };

export async function listar() {
    const resposta = await fetch(URL);
    if (!resposta.ok) throw new Error('Erro ao listar equipamentos');
    return resposta.json();
}

export async function cadastrar(dados) {
    const resposta = await fetch(URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error('Erro ao cadastrar equipamento');
    return resposta.json();
}

export async function atualizar(id, dados) {
    const resposta = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(dados)
    });
    if (!resposta.ok) throw new Error('Erro ao atualizar equipamento');
    return resposta.json();
}

export async function excluir(id) {
    const resposta = await fetch(`${URL}/${id}`, { method: 'DELETE' });
    if (!resposta.ok) throw new Error('Erro ao excluir equipamento');
    return resposta.json();
}
