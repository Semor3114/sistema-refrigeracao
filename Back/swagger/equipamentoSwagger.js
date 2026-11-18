const corpo = {
    required: true,
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    eqp_nome: { type: 'string', example: 'Split Inverter Sala' },
                    eqp_tipo: { type: 'string', example: 'Ar-condicionado' },
                    eqp_marca: { type: 'string', example: 'LG' },
                    eqp_potencia_btu: { type: 'integer', example: 12000 }
                },
                required: ['eqp_nome', 'eqp_tipo']
            }
        }
    }
};

const paramId = [{
    name: 'id', in: 'path', required: true,
    schema: { type: 'integer' }, description: 'ID do equipamento'
}];

const equipamentoSwagger = {
    paths: {
        '/equipamentos': {
            get: {
                tags: ['Equipamentos'],
                summary: 'Lista todos os equipamentos',
                responses: {
                    200: { description: 'Lista retornada com sucesso' },
                    500: { description: 'Erro interno do servidor' }
                }
            },
            post: {
                tags: ['Equipamentos'],
                summary: 'Cadastra um novo equipamento',
                requestBody: corpo,
                responses: {
                    201: { description: 'Equipamento cadastrado com sucesso' },
                    400: { description: 'Dados inválidos' },
                    500: { description: 'Erro interno do servidor' }
                }
            }
        },
        '/equipamentos/{id}': {
            get: {
                tags: ['Equipamentos'],
                summary: 'Busca um equipamento pelo ID',
                parameters: paramId,
                responses: {
                    200: { description: 'Equipamento encontrado' },
                    404: { description: 'Equipamento não encontrado' },
                    500: { description: 'Erro interno do servidor' }
                }
            },
            put: {
                tags: ['Equipamentos'],
                summary: 'Altera um equipamento',
                parameters: paramId,
                requestBody: corpo,
                responses: {
                    200: { description: 'Equipamento alterado com sucesso' },
                    400: { description: 'Dados inválidos' },
                    404: { description: 'Equipamento não encontrado' },
                    500: { description: 'Erro interno do servidor' }
                }
            },
            delete: {
                tags: ['Equipamentos'],
                summary: 'Exclui um equipamento',
                parameters: paramId,
                responses: {
                    200: { description: 'Equipamento excluído com sucesso' },
                    404: { description: 'Equipamento não encontrado' },
                    500: { description: 'Erro interno do servidor' }
                }
            }
        }
    }
};

module.exports = equipamentoSwagger;
