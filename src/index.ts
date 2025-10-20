/// <reference path="types/express.d.ts" />

require('dotenv').config();

import AdminController from 'controller/admin-controller';
import express from 'express';
import {HttpError} from 'infra/error/error-classes';

import {log, loggerLevel, LogLevel} from '@logger';
import { auth } from 'infra/security/auth';
import {jsonParser} from 'middleware/jsonParser';
import {enableLoggedResponses, initRequestLogger} from 'middleware/logs';
import {errorHandler, jsonParserHandler, listenUnhandledRejections} from 'infra/error/error-handler';
import adminRouter from 'router/admin-router';

import * as DevKit from "./.dev/develop-kit";
import rotaRouter from 'router/rota-router';

// Set Level before executing other dependencies that might use the logger
loggerLevel(LogLevel.TRACE);

DevKit.setExecutionMode(DevKit.ExecutionMode.DEVELOPMENT);
DevKit.projectStatus();

listenUnhandledRejections();

const app = express();
const PORT = process.env.PORT || 8800;


app.use(jsonParser);
app.use(jsonParserHandler);

app.use(initRequestLogger);
app.use(enableLoggedResponses);

app.post('/register', new AdminController().post);
app.post('/login', new AdminController().login);

app.use('/admin', auth, adminRouter());
app.use('/rota', auth, rotaRouter());

app.all('/{*path}', (req, _res, next) => {
    next(new HttpError(404, `Router with Path '${req.originalUrl}' Not Found`));
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
