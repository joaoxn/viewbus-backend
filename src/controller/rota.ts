import bcrypt from 'bcryptjs';
import * as admin from 'controller/admin';
import pool from 'database/db';
import { getRota, type Rota } from 'database/entities';
import { HttpError } from 'error/error-classes';
import express, { type Request, type Response } from 'express';

const getId = (req: Request) => {
	const id = Number(req.params.id);
	if (id == undefined || isNaN(id)) throw new HttpError(400, "No ID Provided");
	return id;
}

export const getByAdmin = async (req: Request, res: Response) => {
	const admin_id = admin.getId(req);

	const result = await pool.query<Rota>(`
	SELECT * FROM rota WHERE admin_id = $1
	`, [admin_id]);

	const rotas = result.rows;

	res.status(200).json({
		message: "Rotas encontradas com sucesso",
		result: rotas
	});
}
export const get = async (req: Request<{id:string}>, res: Response) => {
	const id = getId(req);

	const result = await pool.query<Rota>(`
	SELECT * FROM rota WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Rota with ID ${id} not found`);

	const rota = result.rows[0];

	res.status(200).json({
		message: "Rota encontrada com sucesso",
		result: rota
	});
}

export const post = async (req: Request, res: Response) => {
	const adminId = admin.getId(req);
	const rotaDTO = getRota(req);

	const result = await pool.query<any>(`
	INSERT INTO rota (codigo, origem, destino, via, empresa, admin_id) VALUES ($1, $2, $3, $4, $5, $6)
	`, [rotaDTO.codigo, rotaDTO.origem, rotaDTO.destino, rotaDTO.via, rotaDTO.empresa, adminId]);

	const rota = result.rows[0];
	res.status(201).json({
		message: "Rota criada com sucesso",
		result: rota
	});
}
export const put = async (req: Request<{id:string}>, res: Response) => {
	const id = getId(req);
	const adminId = admin.getId(req);
	const rotaDTO = getRota(req);

	const result = await pool.query<any>(`
	UPDATE rota SET codigo = $1, origem = $2, destino = $3, via = $4, admin_id = $5 WHERE id = $6
	`, [rotaDTO.codigo, rotaDTO.origem, rotaDTO.destino, rotaDTO.via, adminId, id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Rota with ID ${id} not found`);

	const rota = result.rows[0];
	res.status(200).json({
		message: "Rota atualizada com sucesso",
		result: rota
	});
}

export const remove = async (req: Request<{id:string}>, res: Response) => {
	const id = getId(req);

	const result = await pool.query<any>(`
	DELETE FROM rota WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Rota with ID ${id} not found`);

	const rota = result.rows[0];
	res.status(200).json({
		message: "Rota removida com sucesso",
		result: rota
	});
}
