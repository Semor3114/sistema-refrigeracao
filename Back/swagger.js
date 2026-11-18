const equipamentoSwagger = require('./swagger/equipamentoSwagger');

const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'API - Sistema de Refrigeração',
        version: '1.0.0',
        description: 'Documentação da API do sistema de refrigeração'
    },
    servers: [{ url: 'http://localhost:3000' }],
    paths: {
        ...equipamentoSwagger.paths
    }
};

module.exports = swaggerSpec;
