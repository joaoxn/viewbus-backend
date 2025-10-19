import { log, LogLevel } from '@logger';
import { Pool } from 'pg';


const DB_PORT = process.env.DB_PORT ?
    Number(process.env.DB_PORT) : undefined;

// Cria a conexão com o banco
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: DB_PORT,
});

pool.on('connect', () =>
    log(LogLevel.INFO, 'database.ts', null, console.info,
        'Database Connected')
);

export default pool;
