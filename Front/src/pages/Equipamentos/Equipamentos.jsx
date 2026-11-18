import { useEffect, useState } from 'react';
import * as service from '../../services/equipamentoService.js';
import './Equipamentos.css';

const TIPOS = ['Ar-condicionado', 'Geladeira', 'Freezer', 'Câmara fria', 'Bebedouro', 'Outro'];
const VAZIO = { eqp_nome: '', eqp_tipo: TIPOS[0], eqp_marca: '', eqp_potencia_btu: '' };

function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [form, setForm] = useState(VAZIO);
    const [tipoOutro, setTipoOutro] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        carregar();
    }, []);

    async function carregar() {
        try {
            setEquipamentos(await service.listar());
        } catch (erro) {
            setMensagem(erro.message);
        }
    }

    function alterarCampo(e) {
        const { name, value } = e.target;

        if (name === 'eqp_tipo' && value !== 'Ar-condicionado') {
            setForm({ ...form, eqp_tipo: value, eqp_potencia_btu: '' });
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    async function salvar(e) {
        e.preventDefault();

        const dados = {
            ...form,
            eqp_tipo: form.eqp_tipo === 'Outro' ? tipoOutro : form.eqp_tipo
        };

        try {
            if (editandoId) {
                await service.atualizar(editandoId, dados);
                setMensagem('Equipamento atualizado!');
            } else {
                await service.cadastrar(dados);
                setMensagem('Equipamento cadastrado!');
            }
            cancelar();
            carregar();
        } catch (erro) {
            setMensagem(erro.message);
        }
    }

    function editar(eq) {
        setEditandoId(eq.eqp_id);

        const tipoConhecido = TIPOS.includes(eq.eqp_tipo);

        setForm({
            eqp_nome: eq.eqp_nome,
            eqp_tipo: tipoConhecido ? eq.eqp_tipo : 'Outro',
            eqp_marca: eq.eqp_marca || '',
            eqp_potencia_btu: eq.eqp_potencia_btu || ''
        });
        setTipoOutro(tipoConhecido ? '' : eq.eqp_tipo);
    }

    function cancelar() {
        setEditandoId(null);
        setForm(VAZIO);
        setTipoOutro('');
    }

    async function excluir(id) {
        if (!window.confirm('Deseja realmente excluir este equipamento?')) return;
        try {
            await service.excluir(id);
            setMensagem('Equipamento excluído!');
            carregar();
        } catch (erro) {
            setMensagem(erro.message);
        }
    }

    return (
        <main className="equipamentos">
            <h2>Equipamentos</h2>

            {mensagem && <p className="mensagem">{mensagem}</p>}

            <form onSubmit={salvar} className="formulario">
                <h3>{editandoId ? 'Alterar equipamento' : 'Novo equipamento'}</h3>

                <input name="eqp_nome" placeholder="Nome" value={form.eqp_nome}
                    onChange={alterarCampo} required />

                <select name="eqp_tipo" value={form.eqp_tipo} onChange={alterarCampo}>
                    {TIPOS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>

                {form.eqp_tipo === 'Outro' && (
                    <input placeholder="Qual equipamento?" value={tipoOutro}
                        onChange={(e) => setTipoOutro(e.target.value)} required />
                )}

                <input name="eqp_marca" placeholder="Marca" value={form.eqp_marca}
                    onChange={alterarCampo} />

                {form.eqp_tipo === 'Ar-condicionado' && (
                    <input name="eqp_potencia_btu" type="number" placeholder="Potência (BTU)"
                        value={form.eqp_potencia_btu} onChange={alterarCampo} />
                )}

                <div className="acoes-form">
                    <button type="submit">{editandoId ? 'Salvar alterações' : 'Cadastrar'}</button>
                    {editandoId && <button type="button" className="cinza" onClick={cancelar}>Cancelar</button>}
                </div>
            </form>

            <table className="tabela">
                <thead>
                    <tr>
                        <th>ID</th><th>Nome</th><th>Tipo</th><th>Marca</th><th>BTU</th><th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {equipamentos.map((eq) => (
                        <tr key={eq.eqp_id}>
                            <td>{eq.eqp_id}</td>
                            <td>{eq.eqp_nome}</td>
                            <td>{eq.eqp_tipo}</td>
                            <td>{eq.eqp_marca}</td>
                            <td>{eq.eqp_potencia_btu}</td>
                            <td>
                                <button onClick={() => editar(eq)}>Editar</button>
                                <button className="vermelho" onClick={() => excluir(eq.eqp_id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    {equipamentos.length === 0 && (
                        <tr><td colSpan="6">Nenhum equipamento cadastrado.</td></tr>
                    )}
                </tbody>
            </table>
        </main>
    );
}

export default Equipamentos;