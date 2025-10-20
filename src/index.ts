/// <reference path="types/express.d.ts" />

import dotenv from 'dotenv';
import { HttpError } from 'error/error-classes';
import { errorHandler } from 'error/error-handler';
import express from 'express'

import * as logger from 'express-logger-functions';
import { LogLevel } from 'express-logger-functions';
import { auth } from 'middleware/auth';
import { enableLoggedResponses, initRequestLogger } from 'middleware/logs';

import * as authController from 'controller/auth-controller';
import * as admin from 'controller/admin';

dotenv.config();

logger.loggerLevel(LogLevel.INFO);

const app = express();

app.use(express.json());
app.use(initRequestLogger);
app.use(enableLoggedResponses);

// Rotas
app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/admin', auth, admin.get);
app.put('/admin', auth, admin.put);
app.delete('/admin', auth, admin.remove);

app.all('/{*path}', (req, _res, next) => {
    next(new HttpError(404, `Router with Path '${req.originalUrl}' Not Found`));
});

app.use(errorHandler);

// Inicialização
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});