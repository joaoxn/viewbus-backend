import * as admin from 'controller/admin';
import pool from 'database/db';
import { getFeedback, type Feedback } from 'database/entities';
import { HttpError } from 'error/error-classes';
import { type Request, type Response } from 'express';

const getId = (req: Request) => {
	const id = Number(req.params.id);
	if (id == undefined || isNaN(id)) throw new HttpError(400, "No ID Provided");
	return id;
}

export const getByRota = async (req: Request, res: Response) => {
	const rota_id = getId(req);

	const result = await pool.query<Feedback>(`
	SELECT * FROM feedback WHERE rota_id = $1
	`, [rota_id]);

	const feedbacks = result.rows;

	res.status(200).json({
		message: "Feedbacks encontrados com sucesso",
		result: feedbacks
	});
}
export const get = async (req: Request<{id:string}>, res: Response) => {
	const id = getId(req);

	const result = await pool.query<Feedback>(`
	SELECT * FROM feedback WHERE id = $1
	`, [id]);

	if (result.rowCount == 0)
		throw new HttpError(404, `Feedback with ID ${id} not found`);

	const feedback = result.rows[0];

	res.status(200).json({
		message: "Feedback encontrado com sucesso",
		result: feedback
	});
}

export const post = async (req: Request, res: Response) => {
	const feedbackDTO = getFeedback(req);

	const result = await pool.query<any>(`
	INSERT INTO feedback (avaliacao, nome, mensagem, rota_id) VALUES ($1, $2, $3, $4)
	`, [feedbackDTO.avaliacao, feedbackDTO.nome, feedbackDTO.mensagem, feedbackDTO.rota_id]);

	const feedback = result.rows[0];
	res.status(201).json({
		message: "Feedback criado com sucesso",
		result: feedback
	});
}
