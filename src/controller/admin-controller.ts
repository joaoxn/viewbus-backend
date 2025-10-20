import bcrypt from 'bcryptjs';
import GenericController from 'controller/generic-controller';
import Admin from 'datasource/entity/Admin';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// import type { Request, Response } from 'express';

import AdminService from 'service/admin-service';


export default class AdminController extends GenericController<Admin, AdminService> {
	constructor(service: AdminService = new AdminService()) {
		super(Admin, service);
	}

	// post = async (req: Request, res: Response) => {
	// 	this.assertValidDTO(req.body);
	//
	// 	const newEntity = await this.service.add(req.body);
	// 	res.status(201).json(newEntity);
	// }

	login = async (req: Request, res: Response) => {
		const { email, senha } = req.body;

		// Busca usuário pelo e-mail
		const usuario = await this.service.getByEmail(email);

		// Verifica se encontrou e compara senha
		if (!usuario || !(await bcrypt.compare(senha, usuario.senha)))
			return res.status(401).json({ erro: 'Credenciais inválidas' });

		if (process.env.JWT_SECRET == undefined)
			throw new Error("JWT_SECRET não foi definido como variável de ambiente");

		// Cria token JWT com ID, nome e cargo
		const token = jwt.sign({
			id: usuario.id,
			nome: usuario.nome,
			email: usuario.email
		}, process.env.JWT_SECRET);

		// Retorna mensagem de sucesso e o token
		res.json({
			mensagem: 'Login bem-sucedido',
			token
		});
	}
}