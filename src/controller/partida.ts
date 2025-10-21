import bcrypt from 'bcryptjs';
import * as admin from 'controller/admin';
import pool from 'database/db';
import { getPartida, type Partida } from 'database/entities';
import { HttpError } from 'error/error-classes';
import express, { type Request, type Response } from 'express';

const getId = (req: Request) => {
	const id = Number(req.params.id);
	if (id == undefined || isNaN(id)) throw new HttpError(400, "No ID Provided");
	return id;
}

export const getByRota = async (req: Request, res: Response) => {
	const rota_id = getId(req);

	const result = await pool.query<Partida>(`
	SELECT * FROM partida WHERE rota_id = $1
	`, [rota_id]);

	const partidas = result.rows;

	res.status(200).json({
		message: "Partidas encontradas com sucesso",
		result: partidas
	});
}
export const get = async (req: Request<{id:string}>, res: Response) => {
	const id = getId(req);

	const result = await pool.query<Partida>(`
	SELECT * FROM partida WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Partida with ID ${id} not found`);

	const partida = result.rows[0];

	res.status(200).json({
		message: "Partida encontrada com sucesso",
		result: partida
	});
}

export const post = async (req: Request, res: Response) => {
	const partidaDTO = getPartida(req);

	const result = await pool.query<any>(`
	INSERT INTO partida (hora, minuto, dia_semana, rota_id) VALUES ($1, $2, $3, $4)
	`, [partidaDTO.hora, partidaDTO.minuto, partidaDTO.dia_semana, partidaDTO.rota_id]);

	const partida = result.rows[0];
	res.status(201).json({
		message: "Partida criada com sucesso",
		result: partida
	});
}
export const put = async (req: Request<{id:string}>, res: Response) => {
	const id = getId(req);
	const partidaDTO = getPartida(req);

	const result = await pool.query<any>(`
	UPDATE partida SET hora = $1, minuto = $2, dia_semana = $3, rota_id = $4 WHERE id = $5
	`, [partidaDTO.hora, partidaDTO.minuto, partidaDTO.dia_semana, partidaDTO.rota_id, id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Partida with ID ${id} not found`);

	const partida = result.rows[0];
	res.status(200).json({
		message: "Partida atualizada com sucesso",
		result: partida
	});
}

export const remove = async (req: Request<{id:string}>, res: Response) => {
	const id = getId(req);

	const result = await pool.query<any>(`
	DELETE FROM partida WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Partida with ID ${id} not found`);

	const partida = result.rows[0];
	res.status(200).json({
		message: "Partida removida com sucesso",
		result: partida
	});
}
