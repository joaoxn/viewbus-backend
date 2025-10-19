import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import auth from 'router/auth';

const app = express();

app.use(express.json());

// Rotas
app.use('', auth);

// Inicialização
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});