const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const equipamentoRoutes = require('./routes/equipamentoRoutes');
app.use('/equipamentos', equipamentoRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
    console.log(`Swagger em http://localhost:${port}/api-docs`);
});
