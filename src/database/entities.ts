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

export function getRota(req: Request): DTO<Rota> {
	const codigo = req.body.codigo;
	const origem = req.body.origem;
	const destino = req.body.destino;
	const via = req.body.via;
	const admin_id = req.body.admin_id;

	if (typeof codigo !== 'number'
		|| typeof origem !== 'string'
		|| typeof destino !== 'string'
		|| typeof via !== 'string' && typeof via !== 'undefined'
		|| typeof admin_id !== 'number'
		|| isNaN(admin_id)
		|| admin_id < 1)
		throw new Error(
			'Uma rota precisa ter as propriedades: codigo, origem, destino, via e admin_id.'
		);
	return { codigo, origem, destino, via, admin_id };
}

export function getPonto(req: Request): DTO<Ponto> {
	const endereco = req.body.endereco;

	if (typeof endereco !== 'string')
		throw new Error('O endereço é obrigatório e deve ser uma string.');

	return { endereco };
}

export function getRotaPonto(req: Request): DTO<Rota_Ponto> {
	const rota_id = req.body.rota_id;
	const ponto_id = req.body.ponto_id;

	if (typeof rota_id !== 'number' || isNaN(rota_id) || rota_id < 1
		|| typeof ponto_id !== 'number' || isNaN(ponto_id) || ponto_id < 1)
		throw new Error(
			'A associação Rota_Ponto precisa ter as propriedades rota_id e ponto_id, ambos números positivos.'
		);

	return { rota_id, ponto_id };
}

export function getPartida(req: Request): DTO<Partida> {
	const hora = req.body.hora;
	const minuto = req.body.minuto;
	const dia_semana = req.body.dia_semana;
	const rota_id = req.body.rota_id;

	if (typeof hora !== 'number' || hora < 0 || hora > 23
		|| typeof minuto !== 'number' || minuto < 0 || minuto > 59
		|| typeof dia_semana !== 'number' || dia_semana < 0 || dia_semana > 6
		|| typeof rota_id !== 'number' || isNaN(rota_id) || rota_id < 1)
		throw new Error(
			'Uma partida precisa ter as propriedades hora, minuto, dia_semana e rota_id válidos.'
		);

	return { hora, minuto, dia_semana, rota_id };
}

export function getFeedback(req: Request): DTO<Feedback> {
	const avaliacao = req.body.avaliacao;
	const nome = req.body.nome;
	const mensagem = req.body.mensagem;
	const rota_id = req.body.rota_id;

	if (typeof avaliacao !== 'number' || avaliacao < 1 || avaliacao > 5
		|| typeof nome !== 'string' || nome.trim() === ''
		|| typeof mensagem !== 'string' || mensagem.trim() === ''
		|| typeof rota_id !== 'number' || isNaN(rota_id) || rota_id < 1)
		throw new Error(
			'Um feedback precisa ter as propriedades: avaliacao (1 a 5), nome, mensagem e rota_id válidos.'
		);

	return { avaliacao, nome, mensagem, rota_id };
}