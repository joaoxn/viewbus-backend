// controllers/authController.js
import type { Admin, DTO } from 'database/entities';
import { HttpError } from 'error/error-classes';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

import pool from '../database/db';


// Registrar novo usuário
export const register = async (req: Request<DTO<Admin>>, res: Response) => {
	const {nome, email, senha} = req.body;

	// Verifica se o e-mail já existe
	const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
	if (result.rowCount != 0)
		throw new HttpError(400, 'Email já cadastrado');

	// Criptografa a senha
	const senhaHash = await bcrypt.hash(senha, 10);

	// Insere o usuário no banco
	await pool.query(
		'INSERT INTO admin (nome, email, senha) VALUES ($1, $2, $3)',
		[nome, email, senhaHash]
	);

	res.status(201).json({
		mensagem: 'Usuário registrado com sucesso'
	});
};

// Login do usuário
export const login = async (req: Request<Admin>, res: Response) => {
	const {email, senha} = req.body;

	const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);

	if (result.rowCount == 0) {
		throw new HttpError(400, 'Usuário não encontrado');
	}

	const usuario = result.rows[0];

	// Compara senha
	const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

	if (!senhaCorreta) {
		throw new HttpError(401, 'Senha e/ou email incorretos');
	}

	if (process.env.JWT_SECRET == undefined)
		throw new Error('JWT_SECRET não foi definido como variável de ambiente');

	// Gera token JWT
	const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {
		expiresIn: '1h'
	});

	res.status(200).json({mensagem: 'Login realizado com sucesso', token});
};