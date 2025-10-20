/// <reference path="types/express.d.ts" />

import dotenv from 'dotenv';
import express from 'express'
import { auth } from 'middleware/auth';
import * as authController from 'controller/auth-controller';
import * as admin from 'controller/admin';
dotenv.config();

import auth from 'router/auth';

const app = express();

app.use(express.json());

// Rotas
app.use('', auth);
app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/admin', auth, admin.get);
app.put('/admin', auth, admin.put);
app.delete('/admin', auth, admin.remove);


// Inicialização
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});