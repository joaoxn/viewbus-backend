// controllers/authController.js
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import pool from '../database/db';

type Admin = {
    nome: string, 
    email: string, 
    senha: string
}



// Registrar novo usuário
export const register = async (req: Request<Admin>, res: Response) => {
    const { nome, email, senha } = req.body;

    try {
        // Verifica se o e-mail já existe
        const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        // Criptografa a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Insere o usuário no banco
        await pool.query(
            'INSERT INTO admin (nome, email, senha) VALUES ($1, $2, $3)',
            [nome, email, senhaHash]
        );

        res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({ mensagem: 'Erro no registro', erro: err.message });
        throw err;
    }
};

// Login do usuário
export const login = async (req: Request<Admin>, res: Response) => {
    const { email, senha } = req.body;

    try {
        const result = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ mensagem: 'Usuário não encontrado' });
        }

        const usuario = result.rows[0];

        // Compara senha
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        if (process.env.JWT_SECRET == undefined)
            throw new Error("JWT_SECRET não foi definido como variável de ambiente");

        // Gera token JWT
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ mensagem: 'Login realizado com sucesso', token });
    } catch (err) {
        if (err instanceof Error)
            res.status(500).json({ mensagem: 'Erro no login', erro: err.message });
        throw err;
    }
};