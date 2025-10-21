/// <reference path="types/express.d.ts" />

import pool from 'database/db';
import dotenv from 'dotenv';
import { HttpError } from 'error/error-classes';
import { errorHandler, jsonParserHandler, listenUnhandledRejections } from 'error/error-handler';
import jsonParser from 'middleware/jsonParser';
import express from 'express';

import * as logger from 'express-logger-functions';
import { LogLevel } from 'express-logger-functions';
import { auth } from 'middleware/auth';
import { enableLoggedResponses, initRequestLogger } from 'middleware/logs';
import { read } from 'utils/files';

import * as authController from 'controller/auth-controller';
import * as admin from 'controller/admin';
import * as rota from 'controller/rota';
import * as partida from 'controller/partida';
import * as feedback from 'controller/feedback';
import * as ponto from 'controller/ponto';


dotenv.config();

logger.loggerLevel(LogLevel.INFO);

listenUnhandledRejections();

const app = express();

app.use(jsonParser);
app.use(jsonParserHandler);

app.use(initRequestLogger);
app.use(enableLoggedResponses);

// Rotas
app.post('/register', authController.register);
app.post('/login', authController.login);

app.get('/admin', auth, admin.get);
app.put('/admin', auth, admin.put);
app.delete('/admin', auth, admin.remove);

app.get('/rota', rota.getAll);
app.get('/rota/:id', rota.get);
app.get('/admin/rotas', auth, rota.getByAdmin);
app.post('/rota', auth, rota.post);
app.put('/rota/:id', auth, rota.put);
app.delete('/rota/:id', auth, rota.remove);

// TODO: restringir acesso aos endpoints privados apenas aos donos das rotas relacionadas
app.get('/rota/:id/partidas', partida.getByRota);
app.get('/partida/:id', partida.get);
app.post('/partida', auth, partida.post);
app.put('/partida/:id', auth, partida.put);
app.delete('/partida/:id', auth, partida.remove);

app.get('/rota/:id/feedbacks', feedback.getByRota);
app.get('/feedback/:id', feedback.get);
app.post('/feedback', feedback.post);

app.get('/rota/:id/pontos', ponto.getByRota);
app.get('/ponto/:id', ponto.get);
app.post('/ponto', auth, ponto.post);
app.put('ponto/:id', auth, ponto.put);
app.delete('ponto/:id', auth, ponto.remove);

app.all('/{*path}', (req, _res, next) => {
	next(new HttpError(404, `Router with Path '${req.originalUrl}' Not Found`));
});

app.use(errorHandler);

// Inicialização
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});

(async () => {
	await pool.query(
		await read<string>('src/database/schema.sql', (x) => x)
	);
})();
