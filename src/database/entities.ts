import type { Request } from 'express';

export type DTO<T> = Omit<T, 'id'>

export type Admin = {
	id: number,
	nome: string,
	email: string,
	senha: string
}

export function getAdmin(req: Request): DTO<Admin> {
	const nome = req.body.nome;
	const email = req.body.email;
	const senha = req.body.senha;

	if (typeof nome !== 'string'
		|| typeof email !== 'string'
		|| typeof senha !== 'string')
		throw new Error(
			'O nome, email e senha são obrigatórios e devem ser strings'
		);
	return { nome, email, senha };
}
