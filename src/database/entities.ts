import type { Request } from 'express';

export type DTO<T> = Omit<T, 'id'>

export type Admin = {
	id: number,
	nome: string,
	email: string,
	senha: string
}

export type Rota = {
	id: number,
	codigo: number,
	origem: string,
	destino: string,
	via: string | undefined,
	admin_id: number
}

export type Ponto = {
	id: number,
	endereco: string
}

export type Rota_Ponto = {
	id: number,
	rota_id: number,
	ponto_id: number
}

export type Partida = {
	id: number,
	hora: number,
	minuto: number,
	dia_semana: number,
	rota_id: number
}

export type Feedback = {
	id: number,
	avaliacao: number,
	nome: string,
	mensagem: string,
	rota_id: number
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
